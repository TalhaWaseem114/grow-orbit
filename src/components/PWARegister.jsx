"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PWARegister() {
  const pathname = usePathname();

  useEffect(() => {
    const isAdmin = pathname?.startsWith("/admin-dashboard");

    // Only inject manifest + register SW on admin pages
    if (!isAdmin) {
      // Clean up manifest link if navigating away (handled by Next.js now, but good fallback)
      const existing = document.querySelector('link[rel="manifest"]');
      if (existing) existing.remove();

      // UNREGISTER service worker if on main site to remove install icon (HTTPS only to prevent localhost dev loops)
      if ("serviceWorker" in navigator && window.location.protocol === "https:") {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (let r of registrations) {
            r.unregister();
          }
        });
      }
      return;
    }

    // Register service worker WITH explicitly restricted scope
    if ("serviceWorker" in navigator && window.location.protocol === "https:") {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/admin-dashboard" })
        .then((r) => console.log("SW registered for admin only:", r))
        .catch((e) => console.log("SW registration failed:", e));
    }
  }, [pathname]);

  return null;
}
