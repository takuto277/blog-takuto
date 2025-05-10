import { getAllPosts } from '../lib/firestore';
import fs from 'fs';
import path from 'path';

async function migrateToMdx() {
  try {
    // Firestoreから全記事を取得
    const posts = await getAllPosts();
    
    // postsディレクトリが存在しない場合は作成
    const postsDir = path.join(process.cwd(), 'posts');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir);
    }
    
    // 各記事をMDXファイルに変換
    for (const post of posts) {
      const frontMatter = `---
title: "${post.title}"
excerpt: "${post.excerpt}"
publishedAt: "${typeof post.publishedAt === 'string' ? post.publishedAt : new Date(post.publishedAt.seconds * 1000).toISOString()}"
${post.tags && post.tags.length > 0 ? `tags: [${post.tags.map(tag => `"${tag}"`).join(', ')}]` : ''}
${post.coverImage ? `coverImage: "${post.coverImage}"` : ''}
---

${post.content}
`;
      
      // MDXファイルに書き込み
      fs.writeFileSync(path.join(postsDir, `${post.slug}.mdx`), frontMatter);
      console.log(`Migrated: ${post.slug}`);
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateToMdx(); 