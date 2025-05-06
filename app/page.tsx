import Link from 'next/link';
import { getPublishedPosts } from '@/lib/firestore';

export default async function Home() {
  // 最新の3件の記事を取得
  const posts = await getPublishedPosts();
  const recentPosts = posts.slice(0, 3);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">Blog Takuto</h1>
        <p className="text-xl text-gray-600">
          技術、趣味、日常の記録を綴るブログです。
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">最新の記事</h2>
        
        {recentPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map(post => (
              <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                {post.coverImage && (
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {new Date(post.publishedAt.seconds * 1000).toLocaleDateString('ja-JP')}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{post.excerpt}</p>
                  <Link 
                    href={`/posts/${post.slug}`} 
                    className="text-blue-600 hover:underline"
                  >
                    続きを読む →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">まだ記事がありません。</p>
        )}
        
        <div className="mt-8 text-center">
          <Link href="/posts" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            すべての記事を見る
          </Link>
        </div>
      </section>
    </div>
  );
}
