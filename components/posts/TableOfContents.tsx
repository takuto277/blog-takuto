'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // 記事の見出しを取得
  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    // h1, h2, h3タグを取得
    const elements = Array.from(
      article.querySelectorAll('h1, h2, h3')
    ) as HTMLHeadingElement[];

    // 各見出しにIDを設定（もしなければ）
    const headingElements = elements.map((element) => {
      // IDがなければテキストから生成
      if (!element.id) {
        const id = element.textContent
          ?.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '');
        element.id = id || `heading-${Math.random().toString(36).substr(2, 9)}`;
      }

      return {
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1)), // h1 -> 1, h2 -> 2, etc.
      };
    });

    setHeadings(headingElements);
  }, []);

  // スクロール時にアクティブな見出しを検出
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    // 各見出し要素を監視
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden lg:block sticky top-20 max-h-[calc(100vh-5rem)] overflow-auto w-64 pr-8">
      <h2 className="text-lg font-semibold mb-4">目次</h2>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${
              heading.level === 1 ? 'ml-0' : heading.level === 2 ? 'ml-4' : 'ml-8'
            }`}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 hover:text-indigo-600 transition-colors ${
                activeId === heading.id
                  ? 'text-indigo-600 font-medium'
                  : 'text-gray-600'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 