'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LanguageAwareText({ jaText, enText }: { jaText: string, enText: string }) {
  const { language } = useLanguage();
  return <>{language === 'ja' ? jaText : enText}</>;
} 