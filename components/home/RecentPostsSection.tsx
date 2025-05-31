'use client';

import Link from 'next/link';
import PostCard from '@/components/posts/PostCard';

// 型定義
type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: string;
  tags?: string[];
  displayTitle?: string;
  displayExcerpt?: string;
};

type RecentPostsSectionProps = {
  posts: Post[];
};

// コンポーネント定義
export default function RecentPostsSection({ posts }: RecentPostsSectionProps) {
  // 修正されたポストデータを準備
  const localizedPosts = posts.map(post => ({
    ...post,
    // displayTitleがあればそれを使い、なければtitleを使用
    title: post.displayTitle || post.title,
    // displayExcerptがあればそれを使い、なければexcerptを使用
    excerpt: post.displayExcerpt || post.excerpt
  }));

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 font-serif">最新の記事</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            技術、趣味、日常の記録を綴ったブログ記事の最新版をご紹介します。
          </p>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* 修正したポストデータを使用 */}
            {localizedPosts.map((post) => (
              <div key={post.slug}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">まだ記事がありません。</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link 
            href="/posts" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            すべての記事を見る
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 