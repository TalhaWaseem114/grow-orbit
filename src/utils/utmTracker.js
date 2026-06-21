"use client";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid"
];

const ATTRIBUTION_META_KEYS = [
  "landingUrl",
  "referrer",
  "utm_captured_at"
];

/**
 * Initializes the UTM tracker. Checks the current URL search parameters
 * for UTM/click IDs and saves any found parameters to sessionStorage.
 */
export function initializeUtmTracker() {
  if (typeof window === "undefined") return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    let hasNewUtms = false;

    // Check if landing metadata exists in either sessionStorage or localStorage
    const storedLandingUrl = sessionStorage.getItem("landingUrl") || localStorage.getItem("landingUrl");
    if (!storedLandingUrl) {
      const currentUrl = window.location.href;
      const ref = document.referrer || "";
      const capturedAt = new Date().toISOString();

      sessionStorage.setItem("landingUrl", currentUrl);
      sessionStorage.setItem("referrer", ref);
      sessionStorage.setItem("utm_captured_at", capturedAt);

      localStorage.setItem("landingUrl", currentUrl);
      localStorage.setItem("referrer", ref);
      localStorage.setItem("utm_captured_at", capturedAt);
    }

    UTM_KEYS.forEach((key) => {
      const value = urlParams.get(key);
      if (value) {
        sessionStorage.setItem(key, value);
        localStorage.setItem(key, value);
        hasNewUtms = true;
      }
    });

    if (hasNewUtms) {
      const currentUrl = window.location.href;
      const ref = document.referrer || sessionStorage.getItem("referrer") || localStorage.getItem("referrer") || "";
      const capturedAt = new Date().toISOString();

      sessionStorage.setItem("landingUrl", currentUrl);
      sessionStorage.setItem("referrer", ref);
      sessionStorage.setItem("utm_captured_at", capturedAt);

      localStorage.setItem("landingUrl", currentUrl);
      localStorage.setItem("referrer", ref);
      localStorage.setItem("utm_captured_at", capturedAt);
    }
  } catch (err) {
    console.warn("[UTM Tracker] Failed to save UTM parameters:", err);
  }
}

/**
 * Retrieves the compiled UTM/click parameters from the active URL search parameters,
 * sessionStorage, and localStorage fallbacks.
 * @returns {Object} An object containing the UTM parameters and the landing page URL.
 */
export function getSavedUtmData() {
  const data = {};
  if (typeof window === "undefined") return data;

  try {
    const urlParams = new URLSearchParams(window.location.search);

    UTM_KEYS.forEach((key) => {
      // Prioritize active URL parameters, fallback to sessionStorage, then localStorage
      const value = urlParams.get(key) || sessionStorage.getItem(key) || localStorage.getItem(key) || "";
      if (value) {
        data[key] = value;
      }
    });

    ATTRIBUTION_META_KEYS.forEach((key) => {
      const value = sessionStorage.getItem(key) || localStorage.getItem(key) || "";
      if (value) data[key] = value;
    });

    data.landingUrl = data.landingUrl || window.location.href;
    data.currentUrl = window.location.href;
  } catch (err) {
    console.warn("[UTM Tracker] Failed to retrieve UTM data:", err);
  }

  return data;
}
