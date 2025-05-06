import Link from 'next/link';

export default function PostsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>
      
      <p className="text-gray-600">まだ記事がありません。</p>
      
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
} 