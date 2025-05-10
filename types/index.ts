import { Timestamp } from 'firebase/firestore';

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: Timestamp | string;
  updatedAt?: Timestamp | string;
  coverImage?: string;
  tags?: string[];
};

export interface PageProps {
  params: {
    [key: string]: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}
