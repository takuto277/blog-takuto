import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { headers } from 'next/headers';

const postsDirectory = path.join(process.cwd(), 'posts');

// すべての記事のスラッグを取得
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      return {
        slug: fileName.replace(/\.mdx$/, '')
      };
    });
}

// すべての記事のメタデータを取得
export async function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      // ファイル名からスラッグを取得
      const slug = fileName.replace(/\.mdx$/, '');
      
      // MDXファイルを文字列として読み込む
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // gray-matterでメタデータを解析
      const { data } = matter(fileContents);
      
      // データをオブジェクトとして返す
      return {
        slug,
        ...data,
      };
    })
    // 公開日で降順ソート
    .sort((a, b) => {
      if (a.publishedAt < b.publishedAt) {
        return 1;
      } else {
        return -1;
      }
    });
    
  return allPostsData;
}

// スラッグから記事を取得
export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    frontMatter: {
      ...data,
      slug,
    },
    content
  };
}

// 言語に基づいて記事をフィルタリングする関数
export async function getPostsByLanguage(language: string) {
  const allPosts = await getAllPosts();
  
  // 言語指定がある記事をフィルタリング
  return allPosts.filter(post => {
    // 言語が指定されていない記事は両方の言語で表示
    if (!post.frontMatter.language) return true;
    
    // 言語が一致する記事のみ表示
    return post.frontMatter.language === language;
  });
}

// 現在の言語を取得する関数
export function getCurrentLocale() {
  const headersList = headers();
  // Acceptヘッダーからロケールを取得する試み
  const acceptLanguage = headersList.get('accept-language');
  
  // 日本語が含まれていれば'ja'、そうでなければ'en'を返す
  if (acceptLanguage && acceptLanguage.includes('ja')) {
    return 'ja';
  }
  
  return 'en'; // デフォルトは英語
}

// getAllPostsLocalized関数を追加
export async function getAllPostsLocalized() {
  const posts = await getAllPosts();
  const locale = getCurrentLocale();
  
  return posts.map(post => {
    return {
      ...post,
      // 言語に応じてタイトルと抜粋を選択
      displayTitle: locale === 'ja' && post.titleJa ? post.titleJa : post.title,
      displayExcerpt: locale === 'ja' && post.excerptJa ? post.excerptJa : post.excerpt,
    };
  });
} 