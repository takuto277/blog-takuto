'use client';

import { useState, useEffect } from 'react';

export default function TableOfContents() {
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);
  
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'));
    setHeadings(elements as HTMLHeadingElement[]);
  }, []);
  
  return (
    <div className="bg-gray-50 p-6 rounded-xl mb-8 sticky top-24">
      <h4 className="text-lg font-bold mb-4">目次</h4>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li 
            key={index}
            className={`${heading.tagName === 'H3' ? 'ml-4' : ''}`}
          >
            <a 
              href={`#${heading.id}`}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              {heading.textContent}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
} 