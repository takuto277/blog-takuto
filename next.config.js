const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // プラグインなしでシンプルな設定
    remarkPlugins: [],
    rehypePlugins: [],
    // MDXコンポーネントをインポートするためのパスを指定
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // MDXファイルをページとして扱う設定
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  typescript: {
    // ビルド時のTypeScriptエラーを警告として扱う
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = withMDX(nextConfig); 