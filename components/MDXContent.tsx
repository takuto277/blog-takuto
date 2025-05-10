'use client';

import * as React from 'react';
import CustomImage from '@/components/CustomImage';
import CustomLink from '@/components/CustomLink';

// Next.js の組み込み MDX サポートを使用するシンプルなラッパー
export default function MDXContent({ content }) {
  return (
    <div className="mdx-content">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
} 