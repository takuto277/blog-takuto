'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'ja',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('ja');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // ブラウザのローカルストレージから言語設定を取得
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // ブラウザの言語設定を取得
      const browserLang = navigator.language.split('-')[0];
      const newLang = browserLang === 'ja' ? 'ja' : 'en';
      setLanguage(newLang);
      localStorage.setItem('language', newLang);
    }
  }, []);
  
  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  // サーバーサイドレンダリング時はデフォルト値を使用
  if (!mounted) {
    return <>{children}</>;
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
} 