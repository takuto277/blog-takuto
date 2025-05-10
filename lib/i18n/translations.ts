export const translations = {
  ja: {
    // ヘッダー
    home: 'ホーム',
    posts: '記事一覧',
    
    // フッター
    links: 'リンク',
    follow: 'フォロー',
    copyright: '© {year} Taku\'s Doodles. All rights reserved.',
    
    // ホームページ
    recentPosts: '最近の記事',
    viewAll: 'すべて見る',
    authorAbout: '著者について',
    
    // 記事ページ
    share: 'シェアする',
    
    // 共通
    blogDescription: '拓人の悪戯書き - エンジニアの視点から技術を綴るブログ',
  },
  en: {
    // Header
    home: 'Home',
    posts: 'All Posts',
    
    // Footer
    links: 'Links',
    follow: 'Follow',
    copyright: '© {year} Taku\'s Doodles. All rights reserved.',
    
    // Homepage
    recentPosts: 'Recent Posts',
    viewAll: 'View All',
    authorAbout: 'About the Author',
    
    // Post page
    share: 'Share',
    
    // Common
    blogDescription: 'Taku\'s technical scribbles - A blog about engineering and technology',
  }
};

export function useTranslation(lang: string) {
  return {
    t: (key: string, params: Record<string, string> = {}) => {
      const translation = translations[lang as keyof typeof translations] || translations.en;
      let text = translation[key as keyof typeof translation] || key;
      
      // パラメータの置換
      Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
      });
      
      return text;
    }
  };
} 