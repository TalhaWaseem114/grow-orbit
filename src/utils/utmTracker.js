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

/**
 * Initializes the UTM tracker. Checks the current URL search parameters
 * for UTM/click IDs and saves any found parameters to sessionStorage.
 */
export function initializeUtmTracker() {
  if (typeof window === "undefined") return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    let hasNewUtms = false;

    UTM_KEYS.forEach((key) => {
      const value = urlParams.get(key);
      if (value) {
        sessionStorage.setItem(key, value);
        hasNewUtms = true;
      }
    });

    if (hasNewUtms) {
      sessionStorage.setItem("utm_captured_at", new Date().toISOString());
    }
  } catch (err) {
    console.warn("[UTM Tracker] Failed to save UTM parameters to sessionStorage:", err);
  }
}

/**
 * Retrieves the compiled UTM/click parameters from both the active URL search parameters
 * and sessionStorage fallbacks.
 * @returns {Object} An object containing the UTM parameters and the landing page URL.
 */
export function getSavedUtmData() {
  const data = {};
  if (typeof window === "undefined") return data;

  try {
    const urlParams = new URLSearchParams(window.location.search);

    UTM_KEYS.forEach((key) => {
      // Prioritize active URL parameters, fallback to sessionStorage
      const value = urlParams.get(key) || sessionStorage.getItem(key) || "";
      if (value) {
        data[key] = value;
      }
    });

    // Capture the original landing URL or the current URL
    data.landingUrl = window.location.href;
  } catch (err) {
    console.warn("[UTM Tracker] Failed to retrieve UTM data:", err);
  }

  return data;
}
