"use client";

import { useEffect } from "react";
import dynamic from 'next/dynamic';
import { initializeUtmTracker } from "@/utils/utmTracker";

const MouseTrailer = dynamic(() => import('@/utils/MouseTrailer'), { 
  ssr: false 
});

export default function ClientSideFeatures() {
  useEffect(() => {
    initializeUtmTracker();

    // Background sync for failed Calendly booking confirmations
    const performBookingSync = async () => {
      if (typeof window === "undefined" || !window.localStorage) return;

      try {
        const keys = Object.keys(localStorage);
        const fallbackKeys = keys.filter(key => key.startsWith("booking_fallback_"));

        for (const key of fallbackKeys) {
          try {
            const rawData = localStorage.getItem(key);
            if (!rawData) continue;

            const fallback = JSON.parse(rawData);
            if (!fallback.leadId || !fallback.email) continue;

            console.log(`[Sync Worker] Attempting to sync fallback booking for lead: ${fallback.leadId}`);
            
            const response = await fetch("/api/leads", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "booking_confirmation",
                leadId: fallback.leadId,
                email: fallback.email,
                meetingBooked: true,
                calendlyEventUri: fallback.calendlyEventUri || "",
                calendlyInviteeUri: fallback.calendlyInviteeUri || "",
              }),
            });

            if (response.ok) {
              console.log(`[Sync Worker] Successfully synchronized booking for lead: ${fallback.leadId}`);
              localStorage.removeItem(key);
            } else {
              console.warn(`[Sync Worker] Synchronization failed with status ${response.status} for lead: ${fallback.leadId}`);
            }
          } catch (itemErr) {
            console.error("[Sync Worker] Failed to process sync item:", itemErr);
          }
        }
      } catch (err) {
        console.error("[Sync Worker] Background sync error:", err);
      }
    };

    // Run sync after a 4-second delay to prioritize main page load and hydration
    const syncTimeout = setTimeout(performBookingSync, 4000);
    return () => clearTimeout(syncTimeout);
  }, []);

  return <MouseTrailer />;
}

