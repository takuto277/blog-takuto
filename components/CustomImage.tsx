import Image from 'next/image';

type CustomImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export default function CustomImage({ src, alt, width, height }: CustomImageProps) {
  // 外部URLかどうかを判定
  const isExternal = src.startsWith('http');
  
  if (isExternal) {
    // 外部画像の場合は通常のimgタグを使用
    return (
      <img 
        src={src} 
        alt={alt} 
        className="rounded-lg my-6 w-full"
        loading="lazy"
      />
    );
  }
  
  // ローカル画像の場合はNext.js Imageを使用
  return (
    <div className="my-6">
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 500}
        className="rounded-lg"
        loading="lazy"
      />
    </div>
  );
} 