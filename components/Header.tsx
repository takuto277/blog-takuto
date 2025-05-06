import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Blog Takuto
              </Link>
            </div>
            <nav className="ml-6 flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ホーム
              </Link>
              <Link href="/posts" className="text-gray-600 hover:text-gray-900">
                記事一覧
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <Link href="/admin" className="text-gray-600 hover:text-gray-900">
              管理画面
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 