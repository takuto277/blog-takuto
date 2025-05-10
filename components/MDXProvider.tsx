'use client';

import { MDXProvider } from '@mdx-js/react';
import MDXComponents from './MDXComponents';

export default function CustomMDXProvider({ children }) {
  return (
    <MDXProvider components={MDXComponents}>
      <div className="mx-auto max-w-3xl overflow-hidden mdx-content">
        {children}
      </div>
    </MDXProvider>
  );
} 