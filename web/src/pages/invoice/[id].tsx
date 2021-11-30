import { useRouter } from 'next/router'
import { Box, Flex, Spacer, Spinner, Text } from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { DepositBox, Layout } from '../../components'
import { useInvoiceQuery } from '../../generated/graphql'
import { apolloClient as client } from '../../utils'

const Invoice = () => {
  const router = useRouter()

  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const { data, loading, error } = useInvoiceQuery({
    client,
    variables: { id },
    pollInterval: 1000 * 30,
  })

  if (loading || !data || !data.invoice) {
    return (
      <Layout title="Invoice | Drivechain Exchange">
        <Flex justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Invoice | Drivechain Exchange">
        <Flex justifyContent="center">
          <Box>{error.message}</Box>
        </Flex>
      </Layout>
    )
  }

  if (!data.invoice.hasDeposited) {
    return (
      <Layout title="Invoice | Drivechain Exchange">
        <Flex>
          <Spacer />

          <Box w={{ base: '340px', sm: '400px' }}>
            {data.invoice.depositChain === 'lightning' ? (
              <Text mb="8">Send 100 sats ({data.invoice.depositChain})</Text>
            ) : (
              <Text mb="2">
                Send between 0.1 and 1.0 BTC ({data.invoice.depositChain}) to
              </Text>
            )}

            <DepositBox
              depositAddress={data.invoice.depositAddress}
              depositChain={data.invoice.depositChain}
              extra={data.invoice.extra}
            />

            <Text mt="12" mb="2">
              Waiting for your deposit
            </Text>

            <BeatLoader speedMultiplier={0.75} />
          </Box>

          <Spacer />
        </Flex>
      </Layout>
    )
  }

  if (data.invoice.hasDeposited) {
    return (
      <Layout title="Invoice | Drivechain Exchange">
        <Flex>
          <Spacer />

          <Box w={{ base: '340px', sm: '400px' }}>
            <Flex direction="column">
              <Text mb="3">
                {data.invoice.depositChain === 'lightning'
                  ? `You sent 100 sats (lightning).`
                  : `You sent ${data.invoice.depositAmount} BTC (${data.invoice.depositChain}).`}
              </Text>

              {/* TODO: add receive chain(s) */}
              <Text>You will receive ~{data.invoice.receiveEstimate} BTC.</Text>
            </Flex>
          </Box>

          <Spacer />
        </Flex>
      </Layout>
    )
  }

  return <Layout title="Invoice | Drivechain Exchange">Unknown error...</Layout>
}

export default Invoice
