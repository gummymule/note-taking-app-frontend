// app/providers.tsx
'use client';

import theme from '@/lib/theme';
import { ThemeProvider } from '@mui/material/styles';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
