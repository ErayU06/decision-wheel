import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  wheels: 'dw:savedWheels',
  history: 'dw:history',
  theme: 'dw:theme',
};
const HISTORY_LIMIT = 200;

async function readJson(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

async function writeJson(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Persistence is best-effort; the in-memory state still works.
  }
}

export const loadSavedWheels = () => readJson(KEYS.wheels, []);
export const saveSavedWheels = (wheels) => writeJson(KEYS.wheels, wheels);

export const loadHistory = () => readJson(KEYS.history, []);
export const saveHistory = (history) => writeJson(KEYS.history, history.slice(0, HISTORY_LIMIT));

export const loadTheme = () => readJson(KEYS.theme, null);
export const saveTheme = (mode) => writeJson(KEYS.theme, mode);
