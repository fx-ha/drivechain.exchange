import Head from 'next/head'
import { Container, Flex, useColorMode } from '@chakra-ui/react'
import { Navigation } from '.'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.50', dark: 'gray.900' }
  const color = { light: 'black', dark: 'white' }

  return (
    <>
      <Head>
        <link rel="icon" href="/images/icon/favicon.ico" />
        <meta name="og:title" content="Drivechain Exchange" />
        <title>Drivechain Exchange</title>
      </Head>

      <Flex
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        minHeight="100vh"
      >
        <Container maxW="3xl">
          <Navigation />
          <main>{children}</main>
        </Container>
      </Flex>
    </>
  )
}

export default Layout
