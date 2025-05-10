import Link from 'next/link';
import { Post } from '@/types';
import PostCard from '@/components/posts/PostCard';

type RecentPostsSectionProps = {
  posts: Post[];
};

export default function RecentPostsSection({ posts }: RecentPostsSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold text-gray-900">最新の記事</h2>
        <Link 
          href="/posts" 
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          すべての記事を見る
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-gray-600">まだ記事がありません。</p>
          <Link href="/admin" className="text-blue-600 hover:underline mt-2 inline-block">
            管理画面から記事を作成する
          </Link>
        </div>
      )}
    </section>
  );
} 