import theme from '@/theme';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import './globals.css';

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <body>{children}</body>
      </ThemeProvider>
    </AppRouterCacheProvider>
    </html>
  );
}
