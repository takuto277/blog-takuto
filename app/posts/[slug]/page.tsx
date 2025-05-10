import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx';
import dynamic from 'next/dynamic';
import TableOfContents from '@/components/posts/TableOfContents';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CustomImage from '@/components/CustomImage';
import CustomLink from '@/components/CustomLink';
import MDXContent from '@/components/MDXContent';
import CustomMDXProvider from '@/components/MDXProvider';
import LanguageAwarePostTitle from '@/components/posts/LanguageAwarePostTitle';
import MDXComponents from '@/components/MDXComponents';
import PostTitle from '@/components/posts/PostTitle';

// 静的パスの生成
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

// メタデータの生成
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }
  
  return {
    title: `${post.frontMatter.title} | Blog Takuto`,
    description: post.frontMatter.excerpt,
    openGraph: {
      title: post.frontMatter.title,
      description: post.frontMatter.excerpt,
      images: post.frontMatter.coverImage ? [post.frontMatter.coverImage] : [],
    },
  };
}

// 動的にMDXコンテンツをインポート
const MDXContentComponent = dynamic(async () => {
  // params が未定義の場合は空のコンポーネントを返す
  if (!params?.slug) {
    return () => <div>Loading...</div>;
  }
  
  try {
    const resolvedParams = await params;
    const Component = await import(`../../../posts/${resolvedParams.slug}.mdx`);
    return Component.default;
  } catch (error) {
    console.error('Error loading MDX:', error);
    return () => <div>Error loading content</div>;
  }
}, { ssr: true });

// コンポーネントの設定
const components = {
  img: CustomImage,
  a: CustomLink,
};

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article className="prose lg:prose-xl mx-auto">
        <PostTitle post={post} />
        
        <div className="mb-8 text-gray-600">
          {new Date(post.frontMatter.publishedAt).toLocaleDateString()}
        </div>
        
        <CustomMDXProvider>
          <MDXRemote 
            source={post.content} 
            components={MDXComponents} 
          />
        </CustomMDXProvider>
      </article>
    </div>
  );
} 