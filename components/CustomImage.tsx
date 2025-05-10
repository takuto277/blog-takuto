'use client';

import Image from 'next/image';
import { useState } from 'react';

type CustomImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
};

export default function CustomImage({ src, alt, width, height, fill }: CustomImageProps) {
  const [isLoading, setLoading] = useState(true);
  
  // 画像のサイズが不明な場合は fill モードを使用
  if (fill || (!width && !height)) {
    return (
      <div className="relative w-full aspect-video my-4">
        <Image
          src={src}
          alt={alt || ''}
          fill
          className={`object-cover rounded-lg transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoadingComplete={() => setLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }
  
  // サイズが指定されている場合は通常モード
  return (
    <Image
      src={src}
      alt={alt || ''}
      className={`rounded-lg transition-opacity duration-300 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}
      onLoadingComplete={() => setLoading(false)}
      width={width || 800}
      height={height || 500}
    />
  );
} 