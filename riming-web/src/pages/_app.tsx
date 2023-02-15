import GlobalStyle from '@/styles/GlobalStyle';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import type { AppProps } from 'next/app';

const cache = createCache({ key: 'next' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <GlobalStyle />
      <Component {...pageProps} />
    </CacheProvider>
  );
}
