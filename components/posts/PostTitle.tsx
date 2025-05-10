'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PostTitle({ post }) {
  const { language } = useLanguage();
  
  const title = language === 'ja' && post.frontMatter.titleJa 
    ? post.frontMatter.titleJa 
    : post.frontMatter.title;
    
  return <h1 className="text-3xl font-bold mb-4">{title}</h1>;
} 