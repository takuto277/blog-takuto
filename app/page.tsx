import Link from 'next/link';
import { getPublishedPosts } from '@/lib/firestore';

export default async function Home() {
  // 最新の4件の記事を取得
  const posts = await getPublishedPosts();
  const recentPosts = posts.slice(0, 4);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* ヒーローセクション */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl transform -skew-y-2 z-0"></div>
        <div className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Blog Takuto
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              技術、趣味、日常の記録を綴るブログです。プログラミング、デザイン、そして日々の発見について共有しています。
            </p>
            <Link 
              href="/posts" 
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              記事を読む
            </Link>
          </div>
        </div>
      </section>
      
      {/* 最新記事セクション */}
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
        
        {recentPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {recentPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {post.coverImage && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {new Date(post.publishedAt.seconds * 1000).toLocaleDateString('ja-JP')}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full ml-2">
                        {post.tags[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2">
                    <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                  <Link 
                    href={`/posts/${post.slug}`} 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    続きを読む
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
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
      
      {/* プロフィールセクション */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 md:w-48 flex items-center justify-center p-8">
              <div className="h-32 w-32 rounded-full bg-white/20 flex items-center justify-center text-white text-4xl font-bold">
                T
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">著者について</h2>
              <p className="text-gray-600 mb-6">
                テクノロジーとデザインが好きなエンジニアです。日々の学びや発見をこのブログで共有しています。
                新しい技術を学ぶことと、それを実際のプロジェクトに活かすことに情熱を持っています。
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
