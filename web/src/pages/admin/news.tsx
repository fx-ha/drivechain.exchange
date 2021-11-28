import { useState } from 'react'
import {
  Box,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import { AdminNav, Layout, PaginateButton } from '../../components'
import { useNewsQuery } from '../../generated/graphql'
import { apolloClient as client, truncateMiddle } from '../../utils'

const NewsAdmin = () => {
  const [cursor, setCursor] = useState<string>()

  const { data, loading, error } = useNewsQuery({
    client,
    variables: { limit: 10, cursor },
  })

  return (
    <Layout title="News | Admin | Drivechain Exchange">
      <AdminNav />

      <Box mt="10" overflowX="auto">
        {error && <Box>{error.message}</Box>}
        {loading && <Box>loading...</Box>}

        <Table maxW="full" variant="simple" size="sm" mb="5">
          <TableCaption placement="top">News</TableCaption>
          <Thead>
            <Tr>
              <Th>Txid</Th>
              <Th>Topic</Th>
              <Th>Fee</Th>
              <Th>Content</Th>
              <Th>Block</Th>
              <Th>Created at</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.newsItems.news.map(
              ({ txid, block, topic, fee, content, createdAt }) => (
                <Tr key={txid}>
                  <Td>{truncateMiddle(txid)}</Td>
                  <Td>{topic.name}</Td>
                  <Td>{fee}</Td>
                  <Td>{content.substring(0, 8)}</Td>
                  <Td>{block.height}</Td>
                  <Td>{new Date(Number(createdAt)).toLocaleString()}</Td>
                  <Td>
                    <ButtonGroup variant="solid" size="sm" spacing={3}>
                      <IconButton
                        aria-label="view"
                        title="view"
                        colorScheme="blue"
                        variant="outline"
                        disabled
                        icon={<BsBoxArrowUpRight />}
                      />
                      <IconButton
                        aria-label="edit"
                        title="edit"
                        colorScheme="green"
                        variant="outline"
                        disabled
                        icon={<AiFillEdit />}
                      />
                      <IconButton
                        aria-label="delete"
                        title="delete"
                        colorScheme="red"
                        variant="outline"
                        disabled
                        icon={<BsFillTrashFill />}
                      />
                    </ButtonGroup>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>

        <Flex w="full" alignItems="center" justifyContent="center">
          <PaginateButton
            disabled={!data?.newsItems.hasMore}
            isLoading={loading}
            onClick={() => {
              if (data?.newsItems.hasMore) {
                setCursor(
                  data?.newsItems.news[data.newsItems.news.length - 1].createdAt
                )
              }
            }}
          >
            <Icon as={IoIosArrowForward} boxSize={4} />
          </PaginateButton>
        </Flex>
      </Box>
    </Layout>
  )
}

export default NewsAdmin
