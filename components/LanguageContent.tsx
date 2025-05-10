'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LanguageContent({ 
  lang, 
  children 
}: { 
  lang: string; 
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  
  if (lang === language) {
    return (
      <div className="break-words overflow-hidden">
        {children}
      </div>
    );
  }
  
  return null;
} 