import Link from 'next/link';
import { getPublishedPosts } from '@/lib/firestore';
import { Post } from '@/types';

// サーバーコンポーネントでデータ取得
export default async function PostsPage() {
  // 公開済みの記事を取得
  const posts = await getPublishedPosts();
  
  // タグの一覧を取得
  const allTags = posts.reduce((tags, post) => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    }
    return tags;
  }, [] as string[]);
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">記事一覧</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            技術、趣味、日常に関する記事をお楽しみください。
          </p>
        </header>
        
        {allTags.length > 0 && (
          <div className="mb-10">
            <div className="flex flex-wrap justify-center gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
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
        
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            ホームに戻る
          </Link>
        </div>
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
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {post.coverImage && (
        <div className="h-48 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6 flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {date.toLocaleDateString('ja-JP')}
          </span>
          {post.tags && post.tags.map(tag => (
            <span key={tag} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
          <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
      </div>
      <div className="px-6 pb-6">
        <Link 
          href={`/posts/${post.slug}`} 
          className="inline-block w-full text-center bg-gray-100 hover:bg-blue-50 text-blue-600 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          続きを読む
        </Link>
      </div>
    </article>
  );
} 