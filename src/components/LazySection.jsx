"use client";

import React, { useState, useEffect, useRef } from "react";

export default function LazySection({ children, height = "300px", className = "" }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is not supported (e.g. older browsers, SSR), render immediately
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px", // Trigger loading 300px before section enters viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        minHeight: isIntersecting ? "auto" : height,
        width: "100%",
      }}
    >
      {isIntersecting ? children : null}
    </div>
  );
}
