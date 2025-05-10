import { Metadata } from 'next';
import { getAllPosts } from '@/lib/mdx';
import ClientPostCard from '@/components/posts/ClientPostCard';
import LanguageAwareText from '@/components/LanguageAwareText';

export const metadata: Metadata = {
  title: '記事一覧 | Taku\'s Doodles',
  description: 'すべての記事一覧です。',
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">
        <LanguageAwareText jaText="記事一覧" enText="All Posts" />
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <ClientPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
} 