import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function PostPage({ params }: { params: { slug: string } }) {
  // 実際のアプリでは、ここでFirestoreから記事を取得します
  // 現在はダミーの実装
  
  // 記事が存在しない場合は404ページを表示
  if (!params.slug) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            記事のタイトル: {params.slug}
          </h1>
          <div className="flex items-center text-gray-600 mb-4">
            <time dateTime={new Date().toISOString()}>
              {new Date().toLocaleDateString('ja-JP')}
            </time>
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <p>これはサンプルの記事内容です。実際のアプリではFirestoreから取得したデータを表示します。</p>
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