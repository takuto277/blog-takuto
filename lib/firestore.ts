import { db } from './firebase';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, where, limit, Timestamp } from 'firebase/firestore';
import { Post } from '@/types';

// コレクション参照
const postsCollection = collection(db, 'posts');

// 全ての記事を取得
export async function getAllPosts(): Promise<Post[]> {
  const q = query(postsCollection, orderBy('publishedAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Post));
}

// 公開済みの記事を取得
export async function getPublishedPosts(): Promise<Post[]> {
  const now = Timestamp.now();
  const q = query(
    postsCollection, 
    where('publishedAt', '<=', now), 
    orderBy('publishedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Post));
}

// スラッグから記事を取得
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(postsCollection, where('slug', '==', slug), limit(1));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    return null;
  }
  
  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as Post;
}

// IDから記事を取得
export async function getPostById(id: string): Promise<Post | null> {
  try {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Post;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting post by ID:', error);
    throw error;
  }
}

// 記事を作成
export async function createPost(postData: Omit<Post, 'id'>): Promise<string> {
  const docRef = await addDoc(postsCollection, {
    ...postData,
    publishedAt: postData.publishedAt instanceof Date ? Timestamp.fromDate(postData.publishedAt) : postData.publishedAt,
    updatedAt: Timestamp.now(),
  });
  
  return docRef.id;
}

// 記事を更新
export async function updatePost(id: string, postData: any): Promise<boolean> {
  try {
    const docRef = doc(db, 'posts', id);
    await updateDoc(docRef, postData);
    return true;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

// 記事を削除
export async function deletePost(id: string): Promise<void> {
  const docRef = doc(db, 'posts', id);
  await deleteDoc(docRef);
} 