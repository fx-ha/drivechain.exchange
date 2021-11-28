import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  useColorMode,
} from '@chakra-ui/react'
import { BiSortAlt2 } from 'react-icons/bi'
import { Layout, NewsCard, PostInput } from '../../components'
import {
  NewsItem,
  useNewsByTopicQuery,
  useTopicsQuery,
} from '../../generated/graphql'
import { apolloClient as client } from '../../utils'

type SortType = 'fee' | 'date'

const News = () => {
  const [sortBy, setSortBy] = useState<SortType>('date')
  const [news, setNews] = useState<NewsItem[]>()

  const router = useRouter()

  const activeTopic =
    typeof router.query.topic === 'string' ? router.query.topic : 'a1a1a1a1'

  const { colorMode } = useColorMode()
  const backgroundColor = { dark: 'gray.600', light: 'gray.100' }

  const { data: topicsData, loading: topicsLoading } = useTopicsQuery({
    client,
  })

  const { data: newsData, loading: newsLoading } = useNewsByTopicQuery({
    client,
    variables: { topic: activeTopic },
    pollInterval: 1000 * 60 * 10,
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
    <Layout
      title="CoinNews | Drivechain Exchange"
      description="News on drivechain.exchange tracks the Coin News data on the DriveChain testnet"
    >
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
                      onClick={() => router.push(topic.hex)}
                      backgroundColor={
                        topic.hex === activeTopic
                          ? backgroundColor[colorMode]
                          : undefined
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
                backgroundColor={
                  sortBy === 'fee' ? backgroundColor[colorMode] : undefined
                }
              >
                Sort by fees
              </MenuItem>
              <MenuItem
                onClick={() => setSortBy('date')}
                backgroundColor={
                  sortBy === 'date' ? backgroundColor[colorMode] : undefined
                }
              >
                Sort by date
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <PostInput topics={topicsData} />

      {newsLoading || !news ? (
        <Flex justifyContent="center" mx={{ md: '10' }}>
          <Spinner />
        </Flex>
      ) : (
        <Box mx={{ md: '10' }} borderWidth="1px" borderRadius="md">
          {news.map((item, index) => (
            <NewsCard index={index} item={item} key={index} />
          ))}
        </Box>
      )}
    </Layout>
  )
}

export default News
