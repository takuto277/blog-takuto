import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/firestore';
import { Metadata } from 'next';

// 型定義
type PostParams = {
  params: {
    slug: string;
  };
};

// メタデータ生成関数
export async function generateMetadata({ params }: PostParams): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

// ページコンポーネント
export default async function PostPage({ params }: PostParams) {
  // Firestoreから記事を取得
  const post = await getPostBySlug(params.slug);
  
  // 記事が存在しない場合は404ページを表示
  if (!post) {
    notFound();
  }
  
  // 日付の処理
  const date = post.publishedAt instanceof Date 
    ? post.publishedAt 
    : new Date(post.publishedAt.seconds * 1000);
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-600 mb-4">
            <time dateTime={date.toISOString()}>
              {date.toLocaleDateString('ja-JP')}
            </time>
            {post.tags && post.tags.length > 0 && (
              <div className="ml-4 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 px-2 py-1 text-sm rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {post.coverImage && (
            <div className="mb-6">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </header>
        
        <div className="prose prose-lg max-w-none">
          {/* 本来はマークダウンやリッチテキストのレンダリングを行う */}
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        <div className="mt-8">
          <Link href="/posts" className="text-blue-600 hover:underline">
            ← 記事一覧に戻る
          </Link>
        </div>
      </article>
    </div>
  );
} 