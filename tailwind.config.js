/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // darkMode: 'class', // この行を削除または以下のようにコメントアウト
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        // カスタムカラーを追加
        'brand': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ...他の色調
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            h1: {
              textAlign: 'center',
            },
            h2: {
              textAlign: 'left',
            },
            h3: {
              textAlign: 'left',
            },
            p: {
              fontSize: '1rem',
              lineHeight: '1.6',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 