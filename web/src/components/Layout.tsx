import Head from 'next/head'
import { Container, Flex } from '@chakra-ui/react'
import { Footer, Navigation } from '.'

const Layout = ({
  title,
  description,
  children,
}: {
  title?: string
  description?: string
  children: React.ReactNode
}) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="og:title" content={title ?? 'Drivechain Exchange'} />
      <meta
        name="description"
        content={
          description ??
          "Coin swap service between Bitcoin's mainchain (drivenet) and sidechains"
        }
      />
      <title>{title ?? 'Drivechain Exchange'}</title>
    </Head>

    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
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

export default Layout
