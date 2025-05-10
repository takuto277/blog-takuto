import { Timestamp } from 'firebase/firestore';

/**
 * FirestoreのTimestampまたはDateオブジェクトを日本語形式の日付文字列に変換
 */
export function formatDate(date: Timestamp | Date): string {
  const jsDate = date instanceof Date 
    ? date 
    : new Date(date.seconds * 1000);
  
  return jsDate.toLocaleDateString('ja-JP');
}

/**
 * より詳細な日付フォーマット（年月日）
 */
export function formatDateFull(date: Timestamp | Date): string {
  const jsDate = date instanceof Date 
    ? date 
    : new Date(date.seconds * 1000);
  
  return jsDate.toLocaleDateString('ja-JP', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
} 