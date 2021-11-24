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
import { useInvoiceQuery } from '../../generated/graphql'
import { apolloClient as client } from '../../utils'

const PostInvoice = () => {
  const router = useRouter()

  const borderColor = useColorModeValue('gray.300', 'white.400')
  const toast = useToast()

  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const { data, loading, error } = useInvoiceQuery({
    client,
    variables: { id },
    pollInterval: 1000 * 60 * 2,
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
            <Text mb="2">
              Send between 0.1 and 1.0 BTC ({data.invoice.depositChain}) to
            </Text>
            <Tooltip label="Copy address" placement="bottom">
              <Box
                w="100%"
                maxW="352px"
                fontSize={{ base: 'sm', sm: 'md' }}
                textAlign="center"
                value={data.invoice.depositAddress}
                cursor="pointer"
                border="1px solid"
                borderRadius="md"
                paddingInlineStart="4"
                paddingInlineEnd="4"
                outline="2px solid transparent"
                height="10"
                position="relative"
                borderColor="inherit"
                padding="0"
                lineHeight="inherit"
                color="inherit"
                fontFamily="inherit"
                margin="0"
                pt="2"
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
                {data.invoice.depositAddress}
              </Box>
            </Tooltip>
            <Box mt="12" mb="2">
              Waiting for your deposit
            </Box>

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
                We received your deposit of {data.invoice.depositAmount} BTC on{' '}
                {data.invoice.depositChain}!
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

  return <Layout title="Post | Drivechain Exchange">Unknown error...</Layout>
}

export default PostInvoice
