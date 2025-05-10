import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import PostCard from '@/components/posts/PostCard';

export const metadata: Metadata = {
  title: '記事一覧 | Blog Takuto',
  description: 'すべての記事一覧です。',
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">記事一覧</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            技術、趣味、日常の記録を綴ったブログ記事の一覧です。
          </p>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">まだ記事がありません。</p>
          </div>
        )}
      </div>
    </div>
  );
} 