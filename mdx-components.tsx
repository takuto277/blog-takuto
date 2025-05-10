import type { MDXComponents } from 'mdx/types';
import CustomImage from '@/components/CustomImage';
import CustomLink from '@/components/CustomLink';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: CustomImage,
    a: CustomLink,
    ...components,
  };
} 