'use client';

import { MDXRemote } from 'next-mdx-remote';
import CustomImage from '@/components/CustomImage';
import CustomLink from '@/components/CustomLink';

const components = {
  img: CustomImage,
  a: CustomLink,
};

export default function MDXContent({ source }) {
  return <MDXRemote {...source} components={components} />;
} 