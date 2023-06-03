import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './components/ErrorBoundary';
import { initAxios } from './config/api.config';
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
            <AuthProvider>
              <Helmet titleTemplate='%s | Shorz Admin' />
              <ColorModeScript initialColorMode={theme.config.initialColorMode} />
              <RootNavigator />
            </AuthProvider>
          </ErrorBoundary>
        </ChakraProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
