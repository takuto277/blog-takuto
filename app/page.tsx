import { getPublishedPosts } from '@/lib/firestore';
import HeroSection from '@/components/home/HeroSection';
import RecentPostsSection from '@/components/home/RecentPostsSection';
import AuthorProfileSection from '@/components/home/AuthorProfileSection';

/**
 * ホームページコンポーネント
 * 最新の記事を取得して表示する
 */
export default async function Home() {
  // 最新の4件の記事を取得
  const posts = await getPublishedPosts();
  const recentPosts = posts.slice(0, 4);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* ヒーローセクション */}
      <HeroSection />
      
      {/* 最新記事セクション */}
      <RecentPostsSection posts={recentPosts} />
      
      {/* プロフィールセクション */}
      <AuthorProfileSection />
    </div>
  );
}
