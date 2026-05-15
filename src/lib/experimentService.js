import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { THEMES, DEFAULT_THEME } from "./experimentConfig";

const COLLECTION = "experiments";
const DOC_ID = "get-started";

import { onSnapshot } from "firebase/firestore";

/**
 * Fetch the active theme from Firestore.
 * Returns { layoutId: "theme-1" | "theme-2" }
 */
export async function fetchExperimentConfig() {
  try {
    const ref = doc(db, COLLECTION, DOC_ID);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      const themeId = data.activeTheme || DEFAULT_THEME;
      const mergedSections = { 
        ...THEMES[themeId].defaultSections, 
        ...(data.activeSections || {}) 
      };
      console.log("[ExperimentService] Fetched config:", { themeId, mergedSections });
      return { 
        layoutId: themeId,
        activeSections: mergedSections
      };
    }

    return { 
      layoutId: DEFAULT_THEME,
      activeSections: THEMES[DEFAULT_THEME].defaultSections
    };
  } catch (err) {
    console.error("[ExperimentService] Fetch failed:", err);
    return { 
      layoutId: DEFAULT_THEME,
      activeSections: THEMES[DEFAULT_THEME].defaultSections
    };
  }
}

/**
 * Subscribe to the active theme from Firestore in real-time.
 */
export function subscribeToExperimentConfig(callback) {
  const ref = doc(db, COLLECTION, DOC_ID);
  console.log("[ExperimentService] Subscribing to:", ref.path);
  return onSnapshot(
    ref,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const themeId = data.activeTheme || DEFAULT_THEME;
        const mergedSections = { 
          ...THEMES[themeId].defaultSections, 
          ...(data.activeSections || {}) 
        };
        console.log("[ExperimentService] Update received:", themeId, mergedSections);
        callback({ 
          layoutId: themeId,
          activeSections: mergedSections
        });
      } else {
        callback({ 
          layoutId: DEFAULT_THEME,
          activeSections: THEMES[DEFAULT_THEME].defaultSections
        });
      }
    },
    (err) => {
      console.error("[ExperimentService] Subscribe error:", err);
      callback({ 
        layoutId: DEFAULT_THEME,
        activeSections: THEMES[DEFAULT_THEME].defaultSections
      });
    }
  );
}

/**
 * Save the active theme and section config to Firestore.
 * @param {string} themeId - "theme-1" or "theme-2"
 * @param {object} sections - { Navbar: true, ... }
 */
export async function saveActiveTheme(themeId, sections) {
  try {
    const ref = doc(db, COLLECTION, DOC_ID);
    await setDoc(ref, {
      activeTheme: themeId,
      activeSections: sections,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error("[Experiment] Failed to save theme:", err);
    return false;
  }
}
