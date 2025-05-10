'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LanguageAwarePostTitle({ post }) {
  const { language } = useLanguage();
  
  return language === 'ja' && post.frontMatter.titleJa 
    ? post.frontMatter.titleJa 
    : post.frontMatter.title;
} 