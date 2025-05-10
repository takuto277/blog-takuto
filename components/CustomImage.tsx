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

export default function CustomImage({ src, alt, ...props }: CustomImageProps) {
  const [isLoading, setLoading] = useState(true);
  
  // 画像のサイズが不明な場合は fill モードを使用
  if (props.fill || (!props.width && !props.height)) {
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
    <div className="w-full flex justify-center my-6">
      <div className="relative max-w-[50%]"> {/* 画像の最大幅を50%に制限 */}
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={500}
          className={`
            rounded-lg 
            transition-opacity duration-300
            ${isLoading ? 'opacity-0' : 'opacity-100'}
          `}
          onLoadingComplete={() => setLoading(false)}
          {...props}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
} 