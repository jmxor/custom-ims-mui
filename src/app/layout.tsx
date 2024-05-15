import MainLayout from '@/components/MainLayout';
import theme from '@/theme';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import './globals.css';

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <body>
        <MainLayout>
          {children}
        </MainLayout>
        </body>
      </ThemeProvider>
    </AppRouterCacheProvider>
    </html>
  );
}
