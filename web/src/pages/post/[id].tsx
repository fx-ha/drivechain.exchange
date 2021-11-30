import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { DepositBox, Layout, NewsContent } from '../../components'
import { usePostQuery } from '../../generated/graphql'
import { apolloClient as client, formatDistance } from '../../utils'

const PostInvoice = () => {
  const router = useRouter()

  const borderColor = useColorModeValue('gray.300', 'white.400')
  const toast = useToast()

  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const { data, loading, error } = usePostQuery({
    client,
    variables: { id },
    pollInterval: 1000 * 30,
  })

  if (loading || !data || !data.post) {
    return (
      <Layout title="Post | Drivechain Exchange">
        <Flex justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Post | Drivechain Exchange">
        <Flex justifyContent="center">
          <Box>{error.message}</Box>
        </Flex>
      </Layout>
    )
  }

  if (!data.post.hasDeposited) {
    return (
      <Layout title="Post | Drivechain Exchange">
        <Flex>
          <Spacer />

          <Box w={{ base: '340px', sm: '400px' }}>
            <Heading as="h1" size="md" mb="4">
              {data.post.topic.name}
            </Heading>

            <Flex
              mb="12"
              p="5"
              borderWidth="1px"
              borderRadius="md"
              overflowX="auto"
            >
              <VStack spacing="2" alignItems="start" w="100%">
                <HStack fontSize="xs">
                  <Text>
                    {new Date(Number(data.post.createdAt)).toLocaleString()}
                  </Text>
                </HStack>

                <NewsContent text={data.post.text} />
              </VStack>
            </Flex>

            <Flex direction="column">
              <Text mb="3">
                Store your post{' '}
                <Tooltip
                  label="Until the Drivechain testnet is reset"
                  placement="top"
                >
                  forever!*
                </Tooltip>
              </Text>

              {data.post.depositChain === 'lightning' ? (
                <Text mb="4">Send 100 sats ({data.post.depositChain})</Text>
              ) : (
                <Text>
                  Send between 0.0002 and 1.0 BTC ({data.post.depositChain}) to
                </Text>
              )}

              <DepositBox
                depositAddress={data.post.depositAddress}
                depositChain={data.post.depositChain}
                extra={data.post.extra}
              />

              <Box mt="12" mb="2">
                Waiting for your payment
              </Box>

              <BeatLoader speedMultiplier={0.75} />
            </Flex>
          </Box>

          <Spacer />
        </Flex>
      </Layout>
    )
  }

  if (data.post.hasDeposited && data.post.txid) {
    return (
      <Layout title="Post | Drivechain Exchange">
        <Flex>
          <Spacer />

          <Box w={{ base: '340px', sm: '400px' }}>
            <Heading as="h1" size="md" mb="4">
              {data.post.topic.name}
            </Heading>

            <Flex
              mb="12"
              p="5"
              borderWidth="1px"
              borderRadius="md"
              overflowX="auto"
            >
              <VStack spacing="2" alignItems="start" w="100%">
                <HStack fontSize="xs">
                  <Text>
                    {Number(data.post.coinNewsFee).toLocaleString('en-US', {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4,
                    })}{' '}
                    ₿
                  </Text>

                  <Tooltip
                    label={new Date(
                      Number(data.post.updatedAt)
                    ).toLocaleString()}
                    placement="top"
                  >
                    <Text>
                      {formatDistance(new Date(Number(data.post.createdAt)))}
                    </Text>
                  </Tooltip>
                </HStack>

                <NewsContent text={data.post.text} />
              </VStack>
            </Flex>

            <Flex direction="column">
              <Text mb="6">
                {data.post.depositChain === 'lightning'
                  ? `You sent 100 sats (lightning).`
                  : `You sent ${data.post.depositAmount} BTC (${data.post.depositChain}).`}
              </Text>

              <Text mb="2">CoinNews Transaction ID:</Text>

              <Tooltip label="Copy transaction id" placement="bottom">
                <Box
                  w="100%"
                  fontSize={{ base: 'sm', sm: 'md' }}
                  cursor="pointer"
                  border="1px solid"
                  borderRadius="md"
                  paddingInlineStart="4"
                  paddingInlineEnd="4"
                  outline="2px solid transparent"
                  height="auto"
                  position="relative"
                  borderColor="inherit"
                  lineHeight="inherit"
                  color="inherit"
                  fontFamily="inherit"
                  margin="0"
                  p="3"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  _hover={{ borderColor }}
                  onClick={() => {
                    navigator.clipboard.writeText(data.post!.txid!)
                    toast({
                      title: 'Copied.',
                      duration: 4000,
                      isClosable: true,
                    })
                  }}
                >
                  {data.post.txid}
                </Box>
              </Tooltip>
            </Flex>

            <Button
              mt="8"
              onClick={() => router.push(`/news/${data.post?.topic.hex}`)}
            >
              View {data.post.topic.name}
            </Button>
          </Box>

          <Spacer />
        </Flex>
      </Layout>
    )
  }

  return <Layout title="Post | Drivechain Exchange">Unknown error...</Layout>
}

export default PostInvoice
