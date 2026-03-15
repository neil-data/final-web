import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/Chatbot';

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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
