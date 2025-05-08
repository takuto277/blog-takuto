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

export interface PageProps {
  params: {
    [key: string]: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}
