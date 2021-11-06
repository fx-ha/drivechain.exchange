import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Text,
  Tooltip,
  useColorMode,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { BiSortAlt2 } from 'react-icons/bi'
import { Layout, NewsContent } from '../components'
import { NewsItem, useNewsQuery, useTopicsQuery } from '../generated/graphql'
import {
  apolloClient as client,
  formatDistance,
  truncateMiddle,
} from '../utils'

type SortType = 'fee' | 'date'

const News = () => {
  const [activeTopic, setActiveTopic] = useState('a1a1a1a1')
  const [sortBy, setSortBy] = useState<SortType>('date')
  const [news, setNews] = useState<NewsItem[]>()

  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const toast = useToast()

  const { data: topicsData, loading: topicsLoading } = useTopicsQuery({
    client,
  })

  const { data: newsData, loading: newsLoading } = useNewsQuery({
    client,
    variables: { topic: activeTopic },
  })

  useEffect(() => {
    if (!newsLoading && newsData) {
      const sorted = (sortBy: SortType) =>
        ({
          date: [...newsData.newsByTopic].sort(
            (a, b) => Number(b.block.createdAt) - Number(a.block.createdAt)
          ),
          fee: [...newsData.newsByTopic].sort((a, b) => b.fee - a.fee),
        }[sortBy])

      setNews(sorted(sortBy))
    }
  }, [sortBy, newsData, newsLoading])

  const backgroundColor = isDark ? 'gray.600' : 'gray.100'

  return (
    <Layout title="CoinNews | Drivechain Exchange">
      <Flex mb="9" alignItems="center">
        <Box>
          {topicsLoading || !topicsData ? (
            <Spinner />
          ) : (
            <Heading as="h1" size="lg">
              {topicsData.topics.find((el) => el.hex === activeTopic)?.name}
            </Heading>
          )}
        </Box>

        <Spacer />

        <Box mr="2">
          <Menu autoSelect={false}>
            <MenuButton as={Button} variant="outline">
              Topic
            </MenuButton>
            <MenuList>
              {topicsLoading || !topicsData ? (
                <MenuItem>
                  <Spinner />
                </MenuItem>
              ) : (
                <>
                  {topicsData.topics.map((topic) => (
                    <MenuItem
                      key={topic.hex}
                      onClick={() => setActiveTopic(topic.hex)}
                      backgroundColor={
                        topic.hex === activeTopic ? backgroundColor : undefined
                      }
                    >
                      {topic.name}
                    </MenuItem>
                  ))}
                </>
              )}
            </MenuList>
          </Menu>
        </Box>

        <Box>
          <Menu autoSelect={false}>
            <MenuButton
              as={IconButton}
              aria-label="Sort options"
              icon={<BiSortAlt2 />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                onClick={() => setSortBy('fee')}
                backgroundColor={sortBy === 'fee' ? backgroundColor : undefined}
              >
                Sort by fees
              </MenuItem>
              <MenuItem
                onClick={() => setSortBy('date')}
                backgroundColor={
                  sortBy === 'date' ? backgroundColor : undefined
                }
              >
                Sort by date
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      {newsLoading || !news ? (
        <Flex justifyContent="center" mx={{ md: '10' }}>
          <Spinner />
        </Flex>
      ) : (
        <Box mx={{ md: '10' }} borderWidth="1px 1px 1px 1px" borderRadius="md">
          {news.map((item, index) => (
            <Flex
              key={index}
              p="5"
              borderWidth={`${index === 0 ? '0' : '1px'} 0 0 0`}
              overflowX="auto"
            >
              <VStack spacing="2" alignItems="start">
                <HStack fontSize="xs">
                  <Tooltip label="Copy transaction id" placement="top">
                    <Text
                      onClick={() => {
                        navigator.clipboard.writeText(item.txid)
                        toast({
                          title: 'Copied.',
                          duration: 4000,
                          isClosable: true,
                        })
                      }}
                      _hover={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      @{truncateMiddle(item.txid)}
                    </Text>
                  </Tooltip>

                  <Text>
                    {Number(item.fee).toLocaleString('en-US', {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4,
                    })}{' '}
                    ₿
                  </Text>

                  <Tooltip
                    label={new Date(
                      Number(item.block.createdAt)
                    ).toLocaleString()}
                    placement="top"
                  >
                    <Text>
                      {formatDistance(new Date(Number(item.block.createdAt)))}
                    </Text>
                  </Tooltip>
                </HStack>

                <NewsContent text={item.content} />
              </VStack>
            </Flex>
          ))}
        </Box>
      )}
    </Layout>
  )
}

export default News
