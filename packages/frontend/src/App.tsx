import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './components/feedback/ErrorBoundary';
import { initAxios, queryClient } from './config/api.config';
import theme from './config/theme';
import { AuthProvider } from './context/auth.context';
import { RootNavigator } from './navigators/Root.navigator';

initAxios();

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <Helmet titleTemplate='%s | Shorz Admin' />
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <RootNavigator />
              </AuthProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </ChakraProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
