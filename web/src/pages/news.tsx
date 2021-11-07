import { useEffect, useState } from 'react'
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
import { Layout, NewsCard } from '../components'
import { NewsItem, useNewsQuery, useTopicsQuery } from '../generated/graphql'
import { apolloClient as client } from '../utils'

type SortType = 'fee' | 'date'

const News = () => {
  const [activeTopic, setActiveTopic] = useState('a1a1a1a1')
  const [sortBy, setSortBy] = useState<SortType>('date')
  const [news, setNews] = useState<NewsItem[]>()

  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

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
            <NewsCard index={index} item={item} key={index} />
          ))}
        </Box>
      )}
    </Layout>
  )
}

export default News
