import GlobalFont from '@/styles/GlobalFont';
import GlobalStyle from '@/styles/GlobalStyle';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalFont />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
