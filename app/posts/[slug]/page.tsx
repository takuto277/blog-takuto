import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/firestore';
import { Metadata } from 'next';
import { PageProps } from '@/types';

// メタデータ生成関数
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug as string);
  
  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

// ページコンポーネント
export default async function PostPage({ params }: PageProps) {
  // Firestoreから記事を取得
  const post = await getPostBySlug(params.slug as string);
  
  // 記事が存在しない場合は404ページを表示
  if (!post) {
    notFound();
  }
  
  // 日付の処理
  const date = post.publishedAt instanceof Date 
    ? post.publishedAt 
    : new Date(post.publishedAt.seconds * 1000);
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {post.coverImage && (
          <div className="h-80 w-full overflow-hidden">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="px-6 py-8 md:px-10 md:py-12">
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags && post.tags.map(tag => (
                <span key={tag} className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <time dateTime={date.toISOString()} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>
          
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-800 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="mb-4 sm:mb-0">
                <span className="text-gray-600 text-sm">シェアする:</span>
                <div className="flex space-x-4 mt-2">
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://blog-takuto.vercel.app/posts/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://blog-takuto.vercel.app/posts/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              <Link 
                href="/posts" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                記事一覧に戻る
              </Link>
            </div>
          </div>
        </div>
      </article>
      
      {/* 関連記事セクション（オプション） */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold mb-2 text-gray-900">
              <Link href="#" className="hover:text-blue-600">
                サンプル関連記事タイトル
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-2">2023年1月1日</p>
            <p className="text-gray-700 line-clamp-2">サンプルの記事説明文がここに入ります。</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold mb-2 text-gray-900">
              <Link href="#" className="hover:text-blue-600">
                サンプル関連記事タイトル2
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-2">2023年1月1日</p>
            <p className="text-gray-700 line-clamp-2">サンプルの記事説明文がここに入ります。</p>
          </div>
        </div>
      </div>
    </div>
  );
} 