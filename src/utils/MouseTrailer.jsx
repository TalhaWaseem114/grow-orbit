"use client";

import React, { useEffect, useRef } from "react";

export default function GrowOrbitCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(DPR, DPR);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Palette — no spaces (faster string concat) ─────────────────
    const PALETTE = [
      "249,115,22",  "251,191,36",  "234,179,8",
      "239,68,68",   "251,146,60",  "253,224,71",
      "249,168,37",  "168,85,247",  "192,132,252",
      "139,92,246",  "217,70,239",
    ];
    const PLEN = PALETTE.length;

    // ── Mouse ──────────────────────────────────────────────────────
    const mouse  = { x: W / 2, y: H / 2 };
    const planet = { x: W / 2, y: H / 2 };
    let speed    = 0;
    let isMoving = false;
    let moveTimer;

    const onMove = (e) => {
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      speed    = Math.sqrt(dx * dx + dy * dy);
      mouse.x  = e.clientX;
      mouse.y  = e.clientY;
      isMoving = true;
      clearTimeout(moveTimer);
      moveTimer = setTimeout(() => { isMoving = false; }, 140);
    };
    window.addEventListener("mousemove", onMove);

    // ── Orbits ─────────────────────────────────────────────────────
    const IDLE_SPEED = 0.018;
    const orbits = [
      {
        baseR: 18, maxR: 28, curR: 18,
        idleSpeed: IDLE_SPEED, activeSpeed: 0.055, curSpeed: IDLE_SPEED,
        angle: 0, planetR: 5.5, color: "249,115,22", dir: 1,
      },
      {
        baseR: 28, maxR: 40, curR: 28,
        idleSpeed: IDLE_SPEED, activeSpeed: 0.038, curSpeed: IDLE_SPEED,
        angle: Math.PI * 0.75, planetR: 4.5, color: "251,191,36", dir: -1,
      },
    ];
    const RING_TILT = -0.42; // shared tilt for both satellites

    // ── Central planet ─────────────────────────────────────────────
    let centralR      = 7;
    const C_BASE_R    = 7;
    const C_MAX_R     = 13;
    let glowIntensity = 0;

    // Gradient cache — only rebuilt when radius shifts more than 0.5px
    let gradCacheR  = -1;
    let gradCache   = null;
    const getGrad = () => {
      if (Math.abs(centralR - gradCacheR) > 0.5) {
        const ox = planet.x - centralR * 0.28;
        const oy = planet.y - centralR * 0.28;
        gradCache = ctx.createRadialGradient(ox, oy, centralR * 0.05, planet.x, planet.y, centralR);
        gradCache.addColorStop(0,    "rgba(253,224,71,1)");
        gradCache.addColorStop(0.42, "rgba(251,146,60,1)");
        gradCache.addColorStop(1,    "rgba(234,88,12,1)");
        gradCacheR = centralR;
      }
      return gradCache;
    };

    // ── Emitted planet pool ────────────────────────────────────────
    // Fixed array, ring-buffer write — zero GC pressure
    const POOL_SIZE = 70;
    const pool = Array.from({ length: POOL_SIZE }, () => ({
      x:0, y:0, vx:0, vy:0, r:0, color:"", tilt:0, life:0, decay:0, active:false,
    }));
    let poolHead = 0;
    let emitTimer = 0;

    const emitPlanet = () => {
      const slot  = pool[poolHead % POOL_SIZE];
      poolHead++;
      const angle = Math.random() * Math.PI * 2;
      slot.x      = planet.x;
      slot.y      = planet.y;
      slot.vx     = Math.cos(angle) * (Math.random() * 0.9 + 0.25);
      slot.vy     = Math.sin(angle) * (Math.random() * 0.9 + 0.25);
      slot.r      = Math.random() * 5.5 + 2.5;
      slot.color  = PALETTE[(Math.random() * PLEN) | 0];
      slot.tilt   = Math.random() * Math.PI;
      slot.life   = 1.0;
      slot.decay  = Math.random() * 0.006 + 0.004;
      slot.active = true;
    };

    // ── Render ─────────────────────────────────────────────────────
    let raf;

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // Lazy lerp
      planet.x += (mouse.x - planet.x) * 0.06;
      planet.y += (mouse.y - planet.y) * 0.06;

      speed        *= 0.78;
      const speedRatio = speed > 16 ? 1 : speed / 16;

      glowIntensity += ((isMoving ? 1 : 0) - glowIntensity) * 0.08;
      centralR      += (C_BASE_R + speedRatio * (C_MAX_R - C_BASE_R) - centralR) * 0.09;

      // Orbit state — plain for loop (faster than forEach)
      for (let i = 0; i < 2; i++) {
        const o = orbits[i];
        o.curSpeed += ((isMoving ? o.activeSpeed : o.idleSpeed) - o.curSpeed) * 0.06;
        o.curR     += ((isMoving ? o.baseR + speedRatio * (o.maxR - o.baseR) : o.baseR) - o.curR) * 0.07;
        o.angle    += o.curSpeed * o.dir;
      }

      // Emit
      emitTimer++;
      if (isMoving && speed > 2 && emitTimer % 3 === 0) {
        emitPlanet();
        if (speed > 10) emitPlanet();
      }

      // ── Emitted planets ────────────────────────────────────────
      // shadowBlur is OFF for all emitted planets — biggest perf saving
      ctx.shadowBlur = 0;

      for (let i = 0; i < POOL_SIZE; i++) {
        const e = pool[i];
        if (!e.active) continue;

        e.x    += e.vx;
        e.y    += e.vy;
        e.vx   *= 0.98;
        e.vy   *= 0.98;
        e.life -= e.decay;

        // Cull early — invisible below 4% life
        if (e.life < 0.04) { e.active = false; continue; }

        const a   = e.life;
        const r   = e.r * (0.55 + e.life * 0.45);
        if (r < 0.4) continue;

        const rRX = r * 2.1;
        const rRY = r * 0.46;

        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(e.tilt);

        // Back half — single stroke (removed redundant dark outline stroke)
        ctx.beginPath();
        ctx.ellipse(0, 0, rRX, rRY, 0, Math.PI, Math.PI * 2);
        ctx.strokeStyle = `rgba(${e.color},${(a * 0.22).toFixed(2)})`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();

        ctx.restore();

        // Planet body — no shadow, no outline stroke
        ctx.beginPath();
        ctx.arc(e.x, e.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${e.color},${(a * 0.92).toFixed(2)})`;
        ctx.fill();

        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(e.tilt);

        // Front half
        ctx.beginPath();
        ctx.ellipse(0, 0, rRX, rRY, 0, 0, Math.PI);
        ctx.strokeStyle = `rgba(${e.color},${(a * 0.50).toFixed(2)})`;
        ctx.lineWidth   = 0.7;
        ctx.stroke();

        ctx.restore();
      }

      // ── Orbit rings — single mid-tone stroke ──────────────────
      // rgba(120,120,120) reads on white AND dark — no dual stroke needed
      ctx.strokeStyle = "rgba(120,120,120,0.30)";
      ctx.lineWidth   = 0.85;

      ctx.setLineDash([]);                   // inner — solid
      ctx.beginPath();
      ctx.arc(planet.x, planet.y, orbits[0].curR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([3, 8]);               // outer — dashed
      ctx.beginPath();
      ctx.arc(planet.x, planet.y, orbits[1].curR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);                   // reset once

      // ── Satellites ────────────────────────────────────────────
      for (let i = 0; i < 2; i++) {
        const o  = orbits[i];
        const sx = planet.x + Math.cos(o.angle) * o.curR;
        const sy = planet.y + Math.sin(o.angle) * o.curR;
        const rRX = o.planetR * 2.0;
        const rRY = o.planetR * 0.48;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(RING_TILT);

        // Back ring half
        ctx.beginPath();
        ctx.ellipse(0, 0, rRX, rRY, 0, Math.PI, Math.PI * 2);
        ctx.strokeStyle = `rgba(${o.color},0.22)`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();

        ctx.restore();

        // Planet body — ONE shadowBlur per satellite
        ctx.beginPath();
        ctx.arc(sx, sy, o.planetR, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${o.color},0.95)`;
        ctx.shadowBlur  = o.planetR * 3.5;
        ctx.shadowColor = `rgba(${o.color},0.50)`;
        ctx.fill();
        ctx.shadowBlur  = 0;

        // Dark outline
        ctx.beginPath();
        ctx.arc(sx, sy, o.planetR, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,0,0,0.14)";
        ctx.lineWidth   = 0.9;
        ctx.stroke();

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(RING_TILT);

        // Front ring half
        ctx.beginPath();
        ctx.ellipse(0, 0, rRX, rRY, 0, 0, Math.PI);
        ctx.strokeStyle = `rgba(${o.color},0.55)`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();

        ctx.restore();
      }

      // ── Central planet ─────────────────────────────────────────
      // Halo — skip entirely below threshold
      if (glowIntensity > 0.04) {
        const halo = ctx.createRadialGradient(
          planet.x, planet.y, centralR,
          planet.x, planet.y, centralR * 3.8
        );
        halo.addColorStop(0, `rgba(249,115,22,${(glowIntensity * 0.28).toFixed(2)})`);
        halo.addColorStop(1, "rgba(249,115,22,0)");
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, centralR * 3.8, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      }

      // Body — cached gradient
      ctx.beginPath();
      ctx.arc(planet.x, planet.y, centralR, 0, Math.PI * 2);
      ctx.fillStyle = getGrad();
      if (glowIntensity > 0.04) {
        ctx.shadowBlur  = centralR * 3 * glowIntensity;
        ctx.shadowColor = `rgba(249,115,22,${(glowIntensity * 0.7).toFixed(2)})`;
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      // Rim
      ctx.beginPath();
      ctx.arc(planet.x, planet.y, centralR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth   = 1;
      ctx.stroke();

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      clearTimeout(moveTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}
