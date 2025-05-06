import { Timestamp } from 'firebase/firestore';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: Timestamp | Date;
  updatedAt?: Timestamp | Date;
  tags?: string[];
}
