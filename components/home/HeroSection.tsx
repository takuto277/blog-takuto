import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl transform -skew-y-2 z-0">
        <div className="absolute inset-0 bg-[url('/patterns/dot-pattern.svg')] opacity-20"></div>
      </div>
      
      {/* 装飾的な要素 */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-300 rounded-full opacity-20 blur-xl"></div>
      
      <div className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-serif">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Blog Takuto
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            技術、趣味、日常の記録を綴るブログです。プログラミング、デザイン、そして日々の発見について共有しています。
          </p>
          <Link 
            href="/posts" 
            className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
          >
            記事を読む
          </Link>
        </div>
      </div>
    </section>
  );
} 