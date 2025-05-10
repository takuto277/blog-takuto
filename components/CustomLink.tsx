import Link from 'next/link';

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function CustomLink({ href, children }: CustomLinkProps) {
  // 外部リンクかどうかを判定
  const isExternal = href.startsWith('http');
  
  if (isExternal) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        {children}
      </a>
    );
  }
  
  // 内部リンクの場合はNext.jsのLinkを使用
  return (
    <Link 
      href={href}
      className="text-blue-600 hover:text-blue-800 transition-colors"
    >
      {children}
    </Link>
  );
} 