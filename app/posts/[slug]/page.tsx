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
import LanguageContent from '@/components/LanguageContent';
import MobileTableOfContents from '@/components/posts/MobileTableOfContents';

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

// カスタム画像コンポーネント
function CustomMDXImage(props) {
  const { src, alt, ...rest } = props;
  return (
    <div className="flex justify-center my-6">
      <Image 
        src={src} 
        alt={alt || ''} 
        width={800}
        height={500}
        className="rounded-lg max-w-[50%]" // 画像の最大幅を50%に制限
        {...rest}
      />
    </div>
  );
}

// コンポーネントの設定
const components = {
  img: CustomMDXImage,
  a: CustomLink,
  LanguageContent,
};

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row">
        {/* デスクトップ用目次 */}
        <TableOfContents />
        
        {/* 記事本文 */}
        <article className="prose mx-auto break-words flex-1 overflow-hidden">
          <div className="text-center mb-8">
            <PostTitle post={post} />
            
            <div className="text-gray-600">
              {new Date(post.frontMatter.publishedAt).toLocaleDateString()}
            </div>
          </div>
          
          <CustomMDXProvider>
            <MDXRemote 
              source={post.content} 
              components={components}
            />
          </CustomMDXProvider>
        </article>
        
        {/* 右側の余白（バランス用） */}
        <div className="hidden lg:block w-64"></div>
      </div>
      
      {/* モバイル用目次（クライアントコンポーネント） */}
      <div className="lg:hidden">
        <MobileTableOfContents headings={[]} /> {/* 実際のheadingsはクライアント側で取得 */}
      </div>
    </div>
  );
} 