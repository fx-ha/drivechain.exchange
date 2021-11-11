import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      html: {
        bg: mode('#fbfdfc', 'gray.800')(props),
      },
      body: {
        color: mode('gray.900', 'whiteAlpha.900')(props),
        bg: mode('#fbfdfc', 'gray.800')(props),
      },
    }),
  },
})

export default theme
