'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ClientPostCard({ post }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {post.frontMatter?.coverImage && (
          <div className="h-48 relative">
            <Image 
              src={post.frontMatter.coverImage} 
              alt={post.frontMatter.title || ''} 
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">
            <LanguageAwarePostTitle post={post} />
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            {new Date(post.frontMatter?.publishedAt || Date.now()).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <LanguageAwarePostExcerpt post={post} />
          </p>
        </div>
      </div>
    </Link>
  );
}

function LanguageAwarePostTitle({ post }) {
  const { language } = useLanguage();
  return language === 'ja' && post.frontMatter?.titleJa 
    ? post.frontMatter.titleJa 
    : post.frontMatter?.title || '';
}

function LanguageAwarePostExcerpt({ post }) {
  const { language } = useLanguage();
  return language === 'ja' && post.frontMatter?.excerptJa 
    ? post.frontMatter.excerptJa 
    : post.frontMatter?.excerpt || '';
} 