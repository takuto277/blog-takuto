/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // ダークモードを有効化
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            h2: {
              fontFamily: 'var(--font-playfair)',
              fontWeight: '700',
            },
            a: {
              color: theme('colors.indigo.600'),
              '&:hover': {
                color: theme('colors.indigo.800'),
              },
            },
            // 他のスタイル
          },
        },
        // ダークモード用のスタイル
        dark: {
          css: {
            color: theme('colors.gray.200'),
            h2: {
              color: theme('colors.gray.100'),
            },
            // 他のダークモードスタイル
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 