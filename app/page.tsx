import HeroSection from '@/components/home/HeroSection';
import RecentPostsSection from '@/components/home/RecentPostsSection';
import AuthorProfileSection from '@/components/home/AuthorProfileSection';
import { getAllPostsLocalized } from '@/lib/mdx';
import Image from 'next/image';

/**
 * ホームページコンポーネント
 * 最新の記事を取得して表示する
 */
export default async function HomePage() {
  const allPosts = await getAllPostsLocalized();
  const recentPosts = allPosts.slice(0, 4); // 最新の4記事を取得
  
  return (
    <main>
      <HeroSection />
      <RecentPostsSection posts={recentPosts} />
      <AuthorProfileSection />
      <div>
        {allPosts.map((post) => (
          <div key={post.slug}>
            <h2>{post.displayTitle}</h2>
            <p>{post.displayExcerpt}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
