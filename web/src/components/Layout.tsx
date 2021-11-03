import Head from 'next/head'
import { Container, Flex, useColorMode } from '@chakra-ui/react'
import { Footer, Navigation } from '.'

const Layout = ({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.50', dark: 'gray.900' }
  const color = { light: 'black', dark: 'white' }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={title ?? 'Drivechain Exchange'} />
        <title>{title ?? 'Drivechain Exchange'}</title>
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

        <Footer />
      </Flex>
    </>
  )
}

export default Layout
