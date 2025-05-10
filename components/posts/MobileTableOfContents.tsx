'use client';

import { useState } from 'react';

type Props = {
  headings: { id: string; text: string; level: number }[];
};

export default function MobileTableOfContents({ headings }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* モバイル用トグルボタン */}
      <button
        className="fixed bottom-4 right-4 lg:hidden bg-indigo-600 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
        aria-label="目次を開く"
      >
        {/* シンプルなリストアイコン */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>

      {/* モバイル用ドロワー */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">目次</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500"
                aria-label="閉じる"
              >
                {/* シンプルなバツアイコン */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={`${
                    heading.level === 1 ? 'ml-0' : heading.level === 2 ? 'ml-4' : 'ml-8'
                  }`}
                >
                  <a
                    href={`#${heading.id}`}
                    className="block py-1 text-gray-600 hover:text-indigo-600"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: 'smooth',
                      });
                      setIsOpen(false);
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
} 