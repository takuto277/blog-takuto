import Link from 'next/link';

export default function Home() {
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
        <p className="text-gray-600">まだ記事がありません。</p>
        
        <div className="mt-8 text-center">
          <Link href="/posts" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            すべての記事を見る
          </Link>
        </div>
      </section>
    </div>
  );
}
