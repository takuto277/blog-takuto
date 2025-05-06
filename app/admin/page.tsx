'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 実際のアプリではFirebase Authenticationでログイン処理を行います
    alert('ログイン機能はまだ実装されていません');
  };

  const handleLogout = () => {
    // 実際のアプリではFirebase Authenticationでログアウト処理を行います
    alert('ログアウト機能はまだ実装されていません');
    setUser(false);
  };

  // ログイン後に表示する管理メニュー
  const AdminMenu = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">管理メニュー</h2>
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
      
      {user ? <AdminMenu /> : <LoginForm />}
      
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
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 実際のアプリではFirebase Authenticationでログイン処理を行います
    alert('ログイン機能はまだ実装されていません');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">ログイン</h2>
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
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          ログイン
        </button>
      </form>
    </div>
  );
} 