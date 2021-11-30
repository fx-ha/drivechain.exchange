import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Spacer,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { Layout } from '../../components'
import { useFaucetRequestQuery } from '../../generated/graphql'
import { apolloClient as client } from '../../utils'

const Invoice = () => {
  const router = useRouter()

  const borderColor = useColorModeValue('gray.300', 'white.400')
  const toast = useToast()

  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const { data, loading, error } = useFaucetRequestQuery({
    client,
    variables: { id },
    pollInterval: 1000 * 60 * 1,
  })

  if (loading || !data || !data.faucetRequest) {
    return (
      <Layout title="Faucet | Drivechain Exchange">
        <Flex justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Faucet | Drivechain Exchange">
        <Flex justifyContent="center">
          <Box>{error.message}</Box>
        </Flex>
      </Layout>
    )
  }

  if (!data.faucetRequest.isPaid) {
    return (
      <Layout title="Faucet | Drivechain Exchange">
        <Flex>
          <Spacer />

          <Box w={{ base: '340px', sm: '400px' }}>
            <Text mb="2">
              Sending you {data.faucetRequest.amount} BTC to{' '}
              {data.faucetRequest.address} on {data.faucetRequest.chain}!
            </Text>

            <BeatLoader speedMultiplier={0.75} />
          </Box>

          <Spacer />
        </Flex>
      </Layout>
    )
  }

  if (data.faucetRequest.isPaid) {
    return (
      <Layout title="Faucet | Drivechain Exchange">
        <Flex>
          <Spacer />

          <Box w={{ base: '340px', sm: '400px' }}>
            <Flex direction="column">
              <Text mb="3">
                You received {data.faucetRequest.amount} BTC at{' '}
                {data.faucetRequest.address} on {data.faucetRequest.chain}!
                Transaction ID:
              </Text>

              <Tooltip label="Copy transaction id" placement="bottom">
                <Box
                  w="100%"
                  fontSize={{ base: 'sm', sm: 'md' }}
                  value={data.faucetRequest.txid}
                  cursor="pointer"
                  border="1px solid"
                  borderRadius="md"
                  paddingInlineStart="4"
                  paddingInlineEnd="4"
                  outline="2px solid transparent"
                  height="auto"
                  position="relative"
                  borderColor="inherit"
                  padding="0"
                  lineHeight="inherit"
                  color="inherit"
                  fontFamily="inherit"
                  margin="0"
                  pt="3"
                  pb="2"
                  pr="3"
                  pl="3"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  _hover={{ borderColor }}
                  onClick={(e) => {
                    navigator.clipboard.writeText(
                      e.currentTarget.textContent !== null
                        ? e.currentTarget.textContent
                        : ''
                    )
                    toast({
                      title: 'Copied.',
                      duration: 4000,
                      isClosable: true,
                    })
                  }}
                >
                  {data.faucetRequest.txid}
                </Box>
              </Tooltip>
            </Flex>
          </Box>

          <Spacer />
        </Flex>
      </Layout>
    )
  }

  return <Layout title="Faucet | Drivechain Exchange">Unknown error...</Layout>
}

export default Invoice
