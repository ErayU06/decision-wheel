import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getLocales } from 'expo-localization';
import { loadLanguage, saveLanguage } from '../storage/storage';
import { DEFAULT_LANGUAGE, LANGUAGES, translations } from './translations';

const detectLanguage = () => {
  const code = getLocales()[0]?.languageCode;
  return LANGUAGES.includes(code) ? code : DEFAULT_LANGUAGE;
};

const format = (text, params) =>
  params ? text.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`)) : text;

const LanguageContext = createContext({
  lang: DEFAULT_LANGUAGE,
  setLang: () => {},
  toggleLang: () => {},
  t: (key) => key,
  pick: (value) => value?.[DEFAULT_LANGUAGE],
  locale: 'en-US',
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectLanguage);

  // A saved choice wins over the device language.
  useEffect(() => {
    loadLanguage().then((saved) => {
      if (LANGUAGES.includes(saved)) setLangState(saved);
    });
  }, []);

  const setLang = useCallback((next) => {
    setLangState(next);
    saveLanguage(next);
  }, []);

  const toggleLang = useCallback(() => setLang(lang === 'tr' ? 'en' : 'tr'), [lang, setLang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      locale: lang === 'tr' ? 'tr-TR' : 'en-US',
      // t('key', { n: 3 }) looks up the dictionary and fills {placeholders}.
      t: (key, params) => format(translations[lang][key] ?? translations[DEFAULT_LANGUAGE][key] ?? key, params),
      // pick({ tr, en }) selects the current language from a data object.
      pick: (obj) => obj?.[lang] ?? obj?.[DEFAULT_LANGUAGE],
    }),
    [lang, setLang, toggleLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
