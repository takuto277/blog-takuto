import { Timestamp } from 'firebase/firestore';

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
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
