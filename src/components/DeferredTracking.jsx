"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const META_PIXEL_ID = "1743928903460669";

function loadMetaPixel() {
  if (typeof window === "undefined" || window.fbq) return;

  /* eslint-disable */
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

function loadClarity(clarityId) {
  if (typeof window === "undefined" || !clarityId || window.clarity) return;

  /* eslint-disable */
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window,document,"clarity","script",clarityId);
  /* eslint-enable */
}

export default function DeferredTracking({ clarityId, gaId }) {
  const [loadGoogleAnalytics, setLoadGoogleAnalytics] = useState(false);

  useEffect(() => {
    let loaded = false;
    let idleId;
    let timeoutId;

    const load = () => {
      if (loaded) return;
      loaded = true;
      loadMetaPixel();
      loadClarity(clarityId);
      setLoadGoogleAnalytics(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
      window.removeEventListener("scroll", load);
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };

    window.addEventListener("pointerdown", load, { passive: true, once: true });
    window.addEventListener("keydown", load, { once: true });
    window.addEventListener("scroll", load, { passive: true, once: true });

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, { timeout: 10000 });
    } else {
      timeoutId = window.setTimeout(load, 10000);
    }

    return cleanup;
  }, [clarityId]);

  return loadGoogleAnalytics && gaId ? <GoogleAnalytics gaId={gaId} /> : null;
}
