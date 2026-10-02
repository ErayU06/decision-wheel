import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { loadTheme, saveTheme } from '../storage/storage';

const light = {
  mode: 'light',
  bg: '#f5f6fa',
  surface: '#ffffff',
  text: '#2d3436',
  muted: '#636e72',
  inputBg: '#f5f6fa',
  chip: '#dfe6e9',
  placeholder: '#b2bec3',
  accent: '#2d3436',
  accentText: '#ffffff',
};

const dark = {
  mode: 'dark',
  bg: '#101317',
  surface: '#1c2128',
  text: '#f1f3f5',
  muted: '#9aa3ab',
  inputBg: '#2a313a',
  chip: '#343c47',
  placeholder: '#6b747d',
  accent: '#f1f3f5',
  accentText: '#101317',
};

const ThemeContext = createContext({ theme: light, toggle: () => {} });

export function ThemeProvider({ children }) {
  const system = useColorScheme();
  const [override, setOverride] = useState(null);

  useEffect(() => {
    loadTheme().then((saved) => {
      if (saved === 'light' || saved === 'dark') setOverride(saved);
    });
  }, []);

  const mode = override ?? (system === 'dark' ? 'dark' : 'light');

  const toggle = useCallback(() => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setOverride(next);
    saveTheme(next);
  }, [mode]);

  const value = useMemo(
    () => ({ theme: mode === 'dark' ? dark : light, toggle }),
    [mode, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
