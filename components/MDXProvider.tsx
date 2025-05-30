'use client';

import { MDXProvider } from '@mdx-js/react';
import MDXComponents from './MDXComponents';

export default function CustomMDXProvider({ children }) {
  return (
    <MDXProvider components={MDXComponents}>
      {children}
    </MDXProvider>
  );
} 