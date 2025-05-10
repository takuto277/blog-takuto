import Link from 'next/link';

export default function HeroSection() {
  return (
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
  );
} 