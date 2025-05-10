import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx';
import dynamic from 'next/dynamic';
import TableOfContents from '@/components/posts/TableOfContents';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CustomImage from '@/components/CustomImage';
import CustomLink from '@/components/CustomLink';

// 静的パスの生成
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

// メタデータの生成
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
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
const MDXContent = dynamic(async () => {
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
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }
  
  // MDX ファイルを直接読み込む
  const fullPath = path.join(process.cwd(), 'posts', `${resolvedParams.slug}.mdx`);
  const mdxContent = fs.readFileSync(fullPath, 'utf8');
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        {post.frontMatter.coverImage && (
          <div className="h-96 w-full overflow-hidden relative">
            <Image 
              src={post.frontMatter.coverImage} 
              alt={post.frontMatter.title} 
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-4 font-serif">{post.frontMatter.title}</h1>
              <div className="flex items-center">
                <span className="text-sm opacity-90">{new Date(post.frontMatter.publishedAt).toLocaleDateString('ja-JP', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'long'
                })}</span>
              </div>
            </div>
          </div>
        )}
        
        {!post.frontMatter.coverImage && (
          <div className="px-6 py-8 md:px-10 md:py-12 border-b border-gray-100">
            <h1 className="text-4xl font-bold mb-4 font-serif">{post.frontMatter.title}</h1>
            <div className="flex items-center text-gray-500">
              <span className="text-sm">{new Date(post.frontMatter.publishedAt).toLocaleDateString('ja-JP', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
              })}</span>
            </div>
          </div>
        )}
        
        <div className="px-6 py-8 md:px-10 md:py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <TableOfContents />
            </div>
            <div className="md:w-3/4 prose prose-indigo max-w-none">
              <MDXRemote 
                source={post.content} 
                components={components} 
              />
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 px-6 py-8 md:px-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="mb-4 sm:mb-0">
              <span className="text-gray-600 text-sm">シェアする:</span>
              <div className="flex space-x-4 mt-2">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.frontMatter.title)}&url=${encodeURIComponent(`https://blog-takuto.vercel.app/posts/${resolvedParams.slug}`)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://blog-takuto.vercel.app/posts/${resolvedParams.slug}`)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <Link 
              href="/posts" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              記事一覧に戻る
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
} 