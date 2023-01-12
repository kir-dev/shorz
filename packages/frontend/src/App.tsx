import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { RootNavigator } from './navigators/Root.navigator';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import theme from './config/theme';
import { AuthProvider } from './context/auth.context';
import { initAxios } from './config/api.config';
import { ErrorBoundary } from './components/ErrorBoundary';

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
