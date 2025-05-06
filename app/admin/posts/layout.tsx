'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // 未認証の場合、ログインページにリダイレクト
        router.push('/admin');
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [router]);
  
  if (loading) {
    return <div className="p-8">認証状態を確認中...</div>;
  }
  
  return <>{children}</>;
} 