import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Text,
  Tooltip,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { BiSortAlt2 } from 'react-icons/bi'
import { BsCheck } from 'react-icons/bs'
import { Layout } from '../components'
import { NewsItem, useNewsQuery, useTopicsQuery } from '../generated/graphql'
import {
  apolloClient as client,
  formatDistance,
  replaceUrls,
  truncateMiddle,
} from '../utils'

type SortType = 'fee' | 'date'

const News = () => {
  const [topic, setTopic] = useState('a1a1a1a1')
  const [sortBy, setSortBy] = useState<SortType>('date')
  const [news, setNews] = useState<NewsItem[]>()

  const toast = useToast()

  const { data: topicsData, loading: topicsLoading } = useTopicsQuery({
    client,
  })

  const { data: newsData, loading: newsLoading } = useNewsQuery({
    client,
    variables: { topic },
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

  return (
    <Layout title="CoinNews | Drivechain Exchange">
      <Flex mb="9" alignItems="center">
        <Box>
          {topicsLoading || !topicsData ? (
            <Spinner />
          ) : (
            <Heading as="h1" size="lg">
              {topicsData.topics.find((el) => el.hex === topic)?.name}
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
                      onClick={() => setTopic(topic.hex)}
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
              <MenuItem onClick={() => setSortBy('fee')}>
                Sort by fees
                {sortBy === 'fee' && <Icon ml="4" as={BsCheck} />}
              </MenuItem>
              <MenuItem onClick={() => setSortBy('date')}>
                Sort by date
                {sortBy === 'date' && <Icon ml="4" as={BsCheck} />}
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      {newsLoading || !news ? (
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          {news.map((item, index) => (
            <Flex
              key={index}
              p="5"
              mb="6"
              borderWidth="1px"
              borderRadius="md"
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

                <Text
                  dangerouslySetInnerHTML={{
                    __html: replaceUrls(item.content),
                  }}
                />
              </VStack>
            </Flex>
          ))}
        </>
      )}
    </Layout>
  )
}

export default News
