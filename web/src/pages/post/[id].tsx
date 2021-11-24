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
import { Layout, NewsContent } from '../../components'
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
    pollInterval: 1000 * 60 * 2,
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
                </Tooltip>{' '}
                <br />
                Send between 0.0002 and 1.0 BTC ({data.post.depositChain}) to
              </Text>

              <Tooltip label="Copy address" placement="bottom">
                <Box
                  w="100%"
                  fontSize={{ base: 'sm', sm: 'md' }}
                  value={data.post.depositAddress}
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
                  pb="3"
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
                  {data.post.depositAddress}
                </Box>
              </Tooltip>

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

  if (data.post.hasDeposited) {
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
                      Number(data.post.updatedat)
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
              <Text mb="3">
                You sent {data.post.depositAmount} BTC from{' '}
                {data.post.depositChain}! Transaction ID:
              </Text>

              <Tooltip label="Copy transaction id" placement="bottom">
                <Box
                  w="100%"
                  fontSize={{ base: 'sm', sm: 'md' }}
                  value={data.post.txid}
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
