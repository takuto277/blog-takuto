import Link from 'next/link';
import { getPublishedPosts } from '@/lib/firestore';
import { Post } from '@/types';

// サーバーコンポーネントでデータ取得
export default async function PostsPage() {
  // 公開済みの記事を取得
  const posts = await getPublishedPosts();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>
      
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">まだ記事がありません。</p>
      )}
      
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}

// 記事カードコンポーネント
function PostCard({ post }: { post: Post }) {
  const date = post.publishedAt instanceof Date 
    ? post.publishedAt 
    : new Date(post.publishedAt.seconds * 1000);
    
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {post.coverImage && (
        <div className="h-48 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">
          <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          {date.toLocaleDateString('ja-JP')}
        </p>
        <p className="text-gray-700 mb-4">{post.excerpt}</p>
        <Link 
          href={`/posts/${post.slug}`} 
          className="text-blue-600 hover:underline"
        >
          続きを読む →
        </Link>
      </div>
    </div>
  );
} 