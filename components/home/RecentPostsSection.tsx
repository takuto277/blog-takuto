'use client';

import Link from 'next/link';
import { Post } from '@/types';
import PostCard from '@/components/posts/PostCard';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type RecentPostsSectionProps = {
  posts: Post[];
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function RecentPostsSection({ posts }: RecentPostsSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" ref={ref}>
      <div className={`transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">最新の記事</h2>
          <Link 
            href="/posts" 
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            すべての記事を見る
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        {posts.length > 0 ? (
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {posts.map(post => (
              <motion.div key={post.id} variants={item}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <p className="text-gray-600">まだ記事がありません。</p>
            <Link href="/admin" className="text-blue-600 hover:underline mt-2 inline-block">
              管理画面から記事を作成する
            </Link>
          </div>
        )}
      </div>
    </section>
  );
} 