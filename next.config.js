const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // MDXコンポーネントをインポートするためのパスを指定
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack設定を一時的にコメントアウト
  /*
  webpack: (config, { isServer }) => {
    // React の解決を上書き
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': require.resolve('./react-shim.js'),
    };
    return config;
  },
  */
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