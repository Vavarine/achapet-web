import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import { theme, GlobalStyle } from '../styles/index';
import AuthContextProvider from '../contexts/authContext';
import PetModalContextProvider from '../contexts/PetModalContext';
import SearchContentProvider from '../contexts/searchContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <SearchContentProvider>
          <PetModalContextProvider>
            <Component {...pageProps} />
            <GlobalStyle />
            <Toaster />
          </PetModalContextProvider>
        </SearchContentProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
export default MyApp;
