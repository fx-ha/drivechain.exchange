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
        bg: mode('#f7fafc', '#171923')(props),
      },
    }),
  },
})

export default theme
