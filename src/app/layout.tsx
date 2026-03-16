import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'GDGOC IAR — Google Developer Groups On Campus',
  description: 'The official developer community platform for GDGOC at the Institute of Advanced Research. Join events, earn points, and grow with a community of passionate builders.',
  keywords: ['GDGOC', 'Google Developer Groups', 'IAR', 'Institute of Advanced Research', 'developer community', 'hackathon', 'tech events'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-dark-bg text-white antialiased viewport-glow">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
