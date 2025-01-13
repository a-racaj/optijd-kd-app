// Dit is de layout file voor mijn OpTijd app.
// Hier regel ik de basisstructuur en styling voor alle pagina's.
// Ik importeer globale stijlen en gebruik het Inter-lettertype van Google.
// Ook gebruik ik een paar componenten zoals Providers en Toaster voor context en meldingen.
// Ik stel wat metadata in, zoals de titel en beschrijving van de app.
// De RootLayout component zorgt ervoor dat alles netjes wordt weergegeven.
// De taal is ingesteld op Nederlands en ik gebruik het Inter-lettertype voor de tekst.
// Providers helpen met thema's en context, en Toaster laat meldingen zien.

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpTijd',
  description: 'Beheer je taken effectief met OpTijd',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}