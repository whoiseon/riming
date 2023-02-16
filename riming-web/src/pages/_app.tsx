import GlobalStyle from '@/styles/GlobalStyle';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { QueryClient, Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';

const cache = createCache({ key: 'next' });

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cache}>
        <GlobalStyle />
        <ReactQueryDevtools />
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </CacheProvider>
    </QueryClientProvider>
  );
}
