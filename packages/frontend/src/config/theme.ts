import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors: {
    brand: {
      100: '#cee3e7',
      200: '#9dc6d0',
      300: '#6daab8',
      400: '#3c8da1',
      500: '#0B7189',
      600: '#095a6e',
      700: '#074452',
      800: '#042d37',
      900: '#02171b',
    },
  },
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('gray.100', 'gray.900')(props),
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        variant: 'solid',
        colorScheme: 'brand',
      },
    },
    VStack: {
      defaultProps: {
        alignItems: 'flex-start',
        textAlign: 'left',
      },
    },
  },
});

export default theme;
