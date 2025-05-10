'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ClientPostCard({ post }) {
  const { language } = useLanguage();
  
  // タイトルと抜粋を言語に応じて取得
  const title = language === 'ja' && post.titleJa ? post.titleJa : post.title;
  const excerpt = language === 'ja' && post.excerptJa ? post.excerptJa : post.excerpt;
  
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {post.coverImage && (
          <div className="h-48 relative">
            <Image 
              src={post.coverImage} 
              alt={title} 
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 text-sm mb-4">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700">{excerpt}</p>
        </div>
      </div>
    </Link>
  );
} 