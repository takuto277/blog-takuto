const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // remarkPlugins: [],
    // rehypePlugins: [],
    // 必要に応じてプラグインを追加
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // React の解決を上書き
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': require.resolve('./react-shim.js'),
    };
    return config;
  },
  // MDX ファイルをページとして扱う
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  typescript: {
    // ビルド時のTypeScriptエラーを警告として扱う
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com'],
  },
};

module.exports = withMDX(nextConfig); 