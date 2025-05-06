'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllPosts, deletePost } from '@/lib/firestore';
import { Post } from '@/types';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (err: any) {
        setError(`記事の取得に失敗しました: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  const handleDelete = async (id: string) => {
    if (!window.confirm('この記事を削除してもよろしいですか？')) {
      return;
    }
    
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err: any) {
      setError(`記事の削除に失敗しました: ${err.message}`);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">記事管理</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          新規記事作成
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {loading ? (
        <p>読み込み中...</p>
      ) : posts.length > 0 ? (
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {posts.map(post => (
              <li key={post.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium">{post.title}</h2>
                    <p className="text-sm text-gray-500">
                      {new Date(post.publishedAt.toString()).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="px-3 py-1 text-sm text-blue-600 hover:underline"
                      target="_blank"
                    >
                      表示
                    </Link>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-600">まだ記事がありません。</p>
      )}
      
      <div className="mt-8">
        <Link href="/admin" className="text-blue-600 hover:underline">
          ← 管理画面に戻る
        </Link>
      </div>
    </div>
  );
} 