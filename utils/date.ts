import { Timestamp } from 'firebase/firestore';

/**
 * FirestoreのTimestamp、Date、または文字列を日本語形式の日付文字列に変換
 */
export function formatDate(date: Timestamp | Date | string): string {
  let jsDate: Date;
  
  if (date instanceof Date) {
    jsDate = date;
  } else if (typeof date === 'string') {
    jsDate = new Date(date);
  } else {
    // Timestamp
    jsDate = new Date(date.seconds * 1000);
  }
  
  return jsDate.toLocaleDateString('ja-JP');
}

/**
 * より詳細な日付フォーマット（年月日）
 */
export function formatDateFull(date: Timestamp | Date | string): string {
  let jsDate: Date;
  
  if (date instanceof Date) {
    jsDate = date;
  } else if (typeof date === 'string') {
    jsDate = new Date(date);
  } else {
    // Timestamp
    jsDate = new Date(date.seconds * 1000);
  }
  
  return jsDate.toLocaleDateString('ja-JP', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });
} 