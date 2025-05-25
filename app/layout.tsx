import { Inter, Playfair_Display, Montserrat, Merriweather } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
});

const merriweather = Merriweather({ 
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: "Taku's Doodles",
    template: "%s | Taku's Doodles",
  },
  description: 'Technical scribbles by Taku - A blog about engineering and technology',
  alternates: {
    languages: {
      'en-US': '/en',
      'ja-JP': '/ja',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${merriweather.variable} font-sans`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
