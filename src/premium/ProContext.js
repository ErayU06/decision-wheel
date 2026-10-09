import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadPalette, loadPro, savePalette, savePro } from '../storage/storage';
import { getPalette } from '../data/palettes';
import { MONETIZATION_ENABLED } from '../config/features';

export const FREE_WHEEL_LIMIT = 2;
export const FREE_HISTORY_LIMIT = 10;
export const PRO_HISTORY_LIMIT = 200;

const ProContext = createContext({
  isPro: !MONETIZATION_ENABLED,
  setPro: () => {},
  palette: getPalette('default'),
  setPaletteId: () => {},
  upgrade: null,
  showUpgrade: () => {},
  hideUpgrade: () => {},
});

// Mock Pro layer: swap `setPro` for a RevenueCat/IAP purchase + entitlement check later.
export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(false);
  const [paletteId, setPaletteIdState] = useState('default');
  const [upgrade, setUpgrade] = useState(null);

  useEffect(() => {
    if (MONETIZATION_ENABLED) loadPro().then((v) => setIsPro(v === true));
    loadPalette().then((id) => id && setPaletteIdState(id));
  }, []);

  const setPro = useCallback((value) => {
    if (!MONETIZATION_ENABLED) return;
    setIsPro(value);
    savePro(value);
  }, []);

  const setPaletteId = useCallback((id) => {
    setPaletteIdState(id);
    savePalette(id);
  }, []);

  const showUpgrade = useCallback((reason) => {
    if (MONETIZATION_ENABLED) setUpgrade({ reason });
  }, []);
  const hideUpgrade = useCallback(() => setUpgrade(null), []);

  // With monetization off every feature is unlocked.
  const effectivePro = !MONETIZATION_ENABLED || isPro;

  // Pro-only palettes fall back to the default one when Pro is off.
  const palette = useMemo(() => {
    const p = getPalette(paletteId);
    return p.pro && !effectivePro ? getPalette('default') : p;
  }, [paletteId, effectivePro]);

  const value = useMemo(
    () => ({
      isPro: effectivePro,
      setPro,
      palette,
      setPaletteId,
      upgrade,
      showUpgrade,
      hideUpgrade,
    }),
    [effectivePro, setPro, palette, setPaletteId, upgrade, showUpgrade, hideUpgrade]
  );

  return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
}

export const usePro = () => useContext(ProContext);
