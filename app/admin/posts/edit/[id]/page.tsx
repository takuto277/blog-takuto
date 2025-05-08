'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPostById, updatePost } from '@/lib/firestore';
import Link from 'next/link';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        if (post) {
          setTitle(post.title);
          setSlug(post.slug);
          setExcerpt(post.excerpt);
          setContent(post.content);
          setCoverImage(post.coverImage || '');
          setTags(post.tags ? post.tags.join(', ') : '');
        } else {
          setError('記事が見つかりませんでした');
        }
      } catch (err) {
        console.error('記事の取得に失敗しました:', err);
        setError('記事の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      // タグを配列に変換
      const tagArray = tags.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      
      // 記事データの作成
      const postData = {
        title,
        slug,
        excerpt,
        content,
      };
      
      // オプションフィールドは値がある場合のみ追加
      if (coverImage) {
        postData.coverImage = coverImage;
      }
      
      if (tagArray.length > 0) {
        postData.tags = tagArray;
      }
      
      // Firestoreで記事を更新
      await updatePost(id, postData);
      
      setSuccess(true);
      
      // 3秒後に記事一覧ページに遷移
      setTimeout(() => {
        router.push('/admin/posts');
      }, 3000);
      
    } catch (err) {
      console.error('記事の更新に失敗しました:', err);
      setError('記事の更新に失敗しました。もう一度お試しください。');
    } finally {
      setSaving(false);
    }
  };

  const generateSlugFromTitle = () => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      setSlug(generatedSlug);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">記事の編集</h1>
        <Link 
          href="/admin/posts"
          className="inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          記事一覧に戻る
        </Link>
      </div>
      
      {success ? (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                記事が正常に更新されました。記事一覧ページにリダイレクトします...
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                スラッグ <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-2">（URLの一部になります）</span>
              </label>
              <div className="flex">
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={generateSlugFromTitle}
                  className="ml-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  生成
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                抜粋 <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-2">（記事の短い説明）</span>
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                本文 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                カバー画像URL
                <span className="text-xs text-gray-500 ml-2">（オプション）</span>
              </label>
              <input
                id="coverImage"
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {coverImage && (
                <div className="mt-2">
                  <img 
                    src={coverImage} 
                    alt="プレビュー" 
                    className="h-32 object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=画像が読み込めません';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                タグ
                <span className="text-xs text-gray-500 ml-2">（カンマ区切りで複数入力可能）</span>
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/posts"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                キャンセル
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? '保存中...' : '更新する'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
} 