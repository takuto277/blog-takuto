'use client';

import Link from 'next/link';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: string;
  tags?: string[];
};

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  // 日付のフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP');
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col h-full transform hover:-translate-y-1">
      {post.coverImage && (
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center mb-3">
          <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
          {post.tags && post.tags.length > 0 && (
            <span className="ml-2 text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
              {post.tags[0]}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          <Link href={`/posts/${post.slug}`} className="hover:text-indigo-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2 flex-grow">{post.excerpt}</p>
        <Link 
          href={`/posts/${post.slug}`} 
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center mt-auto"
        >
          続きを読む
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 