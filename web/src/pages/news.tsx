import { useEffect, useState } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/layout'
import {
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react'
import { BiSortAlt2 } from 'react-icons/bi'
import { BsCheck } from 'react-icons/bs'
import { Layout } from '../components'
import { replaceUrls } from '../utils'
import { NewsItem, useNewsQuery, useTopicsQuery } from '../generated/graphql'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  cache: new InMemoryCache(),
})

type SortType = 'fee' | 'date'

const News = () => {
  const [topic, setTopic] = useState('a1a1a1a1')
  const [sortBy, setSortBy] = useState<SortType>('date')
  const [news, setNews] = useState<NewsItem[]>()

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
    <Layout title="Coin News | Drivechain Exchange">
      <Flex mb="9" alignItems="center">
        <Box>
          {newsLoading || !news ? (
            <Spinner />
          ) : (
            <Heading as="h1" size="lg">
              {news[0].topic.name}
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
                  <Text>
                    {Number(item.fee).toLocaleString('en-US', {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4,
                    })}{' '}
                    ₿
                  </Text>
                  <Text>
                    {new Date(Number(item.block.createdAt)).toLocaleString()}
                  </Text>
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
