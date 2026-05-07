import type { Metadata } from 'next';
import '../src/index.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Hugeoleen & Carl - January 7th, 2027',
  description: 'Join us for the wedding celebration of Hugeoleen and Carl on January 7th, 2027 at Villa Viento',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Hugeoleen & Carl Wedding',
    description: 'Join us for our wedding celebration on January 7th, 2027',
    url: '/',
    images: ['/LEM00118.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/LEM00118.jpg'],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component
 */
export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
