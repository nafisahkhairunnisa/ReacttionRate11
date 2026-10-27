/**
 * Safe LocalStorage Wrapper for KinetiLab 11
 * Handles error fallbacks, schema versioning, and JSON safety.
 */

export const STORAGE_KEYS = {
  PROGRESS: 'kinetilab_progress_v1',
  QUIZ: 'kinetilab_quiz_history_v1',
  ASSESSMENT: 'kinetilab_assessment_v1',
  GAMIFICATION: 'kinetilab_gamification_v1',
  LAB_STATE: 'kinetilab_lab_state_v1',
  NOTES: 'kinetilab_notes_v1',
  PROFILE: 'kinetilab_profile_v1',
  SETTINGS: 'kinetilab_user_settings_v1',
};

/**
 * Safely retrieve parsed JSON item from localStorage
 * @template T
 * @param {string} key
 * @param {T} fallback
 * @returns {T}
 */
export function getStorageItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[KinetiLab Storage] Error reading key "${key}":`, error);
    return fallback;
  }
}

/**
 * Safely serialize and store item into localStorage
 * @param {string} key
 * @param {any} value
 * @returns {boolean} Success status
 */
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[KinetiLab Storage] Error writing key "${key}":`, error);
    return false;
  }
}

/**
 * Remove an item from localStorage
 * @param {string} key
 */
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[KinetiLab Storage] Error removing key "${key}":`, error);
  }
}
