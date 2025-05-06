'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signIn, signOut } from '@/lib/auth';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error: any) {
      alert(error.message);
    }
  };

  // ログイン後に表示する管理メニュー
  const AdminMenu = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">管理メニュー</h2>
      <p className="mb-4">ログイン中: {user?.email}</p>
      <div className="space-y-2">
        <Link 
          href="/admin/posts" 
          className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
        >
          記事管理
        </Link>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          ログアウト
        </button>
      </div>
    </div>
  );

  // ログイン状態に応じて表示を切り替え
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">管理画面</h1>
      
      {loading ? (
        <p>読み込み中...</p>
      ) : user ? (
        <AdminMenu />
      ) : (
        <LoginForm />
      )}
      
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signIn(email, password);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">ログイン</h2>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">メールアドレス</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>
    </div>
  );
} 