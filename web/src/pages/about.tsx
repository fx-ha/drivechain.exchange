import NextLink from 'next/link'
import { Box, Heading, Link, Text } from '@chakra-ui/react'
import { Layout } from '../components'
import { linkColor } from '../utils'

const About = () => {
  return (
    <Layout title="About | Drivechain Exchange">
      <Box as="section" mb="14">
        <Heading size="lg" as="h2" mb="4">
          Drivechain
        </Heading>

        <Text textAlign="justify" mb="5">
          Drivechain is an implementation of the Bitcoin Improvement Proposals{' '}
          <Link
            isExternal
            href="https://github.com/bitcoin/bips/tree/master/bip-0300"
            color={linkColor}
          >
            BIP 300
          </Link>{' '}
          and{' '}
          <Link
            isExternal
            href="https://github.com/bitcoin/bips/tree/master/bip-0300"
            color={linkColor}
          >
            BIP 301
          </Link>
          . It&#39;s a promising idea to bring sidechains to Bitcoin. For
          testing purposes, it&#39;s running on its own testnet called drivenet.
          You can read more about it and download the software at{' '}
          <Link
            isExternal
            href="https://www.drivechain.info/"
            color={linkColor}
          >
            drivechain.info
          </Link>
          .
        </Text>

        <Text textAlign="justify">
          One of the security features to discourage miners from stealing
          sidechain coins, is a very slow withdrawal process. Sending coins from
          a sidechain back to the mainchain takes three months, which can be
          annoying for honest but impatient users. Services like exchanges
          improve the user experience by providing liquidity on both sides with
          near instant transfers between chains - for a small fee.
        </Text>
      </Box>

      <Box as="section" mb="14">
        <Heading size="lg" as="h2" mb="4">
          CoinNews
        </Heading>

        <Text textAlign="justify" mb="5">
          CoinNews is a fun invention from the team behind drivechain. If you
          want to try it yourself, download the client at{' '}
          <Link
            isExternal
            color={linkColor}
            href="https://www.drivechain.info/releases/index.html"
          >
            drivechain.info/releases
          </Link>
          . It introduces a new interface to write to the blockchain without
          requiring further changes to the Bitcoin protocol. Users pay a small
          fee to miners to have their content stored and organized by topic.
          Have a quick overview of the past CoinNews headlines at{' '}
          <NextLink href="/news" passHref>
            <Link color={linkColor}>drivechain.exchange/news</Link>
          </NextLink>
          .
        </Text>
      </Box>

      <Box as="section">
        <Heading size="lg" as="h2" mb="4">
          Exchange Demo
        </Heading>

        <Text textAlign="justify" mb="5">
          A short demo of an earlier version to showcase a transfer between two
          chains
        </Text>
        <video controls>
          <source src="/sideswap_demo.webm" type="video/webm" />
          <source src="/sideswap_demo.mp4" type="video/mp4" />
          Sorry, your browser doesn&#39;t support embedded videos.
        </video>
      </Box>
    </Layout>
  )
}

export default About
