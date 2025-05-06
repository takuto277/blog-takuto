'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createPost } from '@/lib/firestore';
import { Timestamp } from 'firebase/firestore';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // タグを配列に変換
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      // 記事データを作成（undefined値を除外）
      const postData = {
        title,
        slug,
        excerpt,
        content,
        publishedAt: Timestamp.now(),
      };
      
      // オプションフィールドは値がある場合のみ追加
      if (coverImage) {
        postData.coverImage = coverImage;
      }
      
      if (tagArray.length > 0) {
        postData.tags = tagArray;
      }
      
      // Firestoreに記事を保存
      const postId = await createPost(postData);
      
      // 成功したら記事一覧ページにリダイレクト
      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      setError(`記事の作成に失敗しました: ${err.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">新規記事作成</h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            スラッグ * (URLに使用される識別子、例: my-first-post)
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
            抜粋 * (記事の短い説明)
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={2}
            required
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            本文 *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={10}
            required
          />
        </div>
        
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
            カバー画像URL (オプション)
          </label>
          <input
            type="url"
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            タグ (カンマ区切り、オプション)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="技術, Next.js, Firebase"
          />
        </div>
        
        <div className="flex justify-between">
          <Link
            href="/admin/posts"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? '保存中...' : '保存する'}
          </button>
        </div>
      </form>
    </div>
  );
} 