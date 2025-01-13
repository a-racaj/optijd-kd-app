// Dit is de providers file voor mijn OpTijd app.
// Hier gebruik ik de ThemeProvider van next-themes om de thema's in de app te regelen.
// Hiermee kan de app makkelijk wisselen tussen bijvoorbeeld een licht en donker thema.
// De Providers component zorgt ervoor dat het thema overal in de app beschikbaar is.

'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}