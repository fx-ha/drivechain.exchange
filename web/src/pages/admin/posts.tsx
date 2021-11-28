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
import { usePostsQuery } from '../../generated/graphql'
import { apolloClient as client, truncateMiddle } from '../../utils'

const PostsAdmin = () => {
  const [cursor, setCursor] = useState<string>()

  const { data, loading, error } = usePostsQuery({
    client,
    variables: { limit: 10, cursor },
  })

  return (
    <Layout title="Posts | Admin | Drivechain Exchange">
      <AdminNav />

      <Box mt="10" overflowX="auto">
        {error && <Box>{error.message}</Box>}
        {loading && <Box>loading...</Box>}

        <Table maxW="full" variant="simple" size="sm" mb="5">
          <TableCaption placement="top">Posts</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Txid</Th>
              <Th>Deposit address</Th>
              <Th>Deposit chain</Th>
              <Th>Has deposited?</Th>
              <Th>Deposit amount</Th>
              <Th>CoinNews fee</Th>
              <Th>Text</Th>
              <Th>Topic</Th>
              <Th>Created at</Th>
              <Th>Updated at</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.posts.posts.map(
              ({
                txid,
                topic,
                depositAddress,
                depositChain,
                hasDeposited,
                id,
                text,
                updatedAt,
                coinNewsFee,
                depositAmount,
                createdAt,
              }) => (
                <Tr key={id}>
                  <Td>{id.substring(0, 8)}</Td>
                  <Td>{txid ? truncateMiddle(txid) : undefined}</Td>
                  <Td>{truncateMiddle(depositAddress)}</Td>
                  <Td>{depositChain}</Td>
                  <Td>{hasDeposited ? 'x' : ''}</Td>
                  <Td>{depositAmount}</Td>
                  <Td>{coinNewsFee}</Td>
                  <Td>{text.substring(0, 8)}</Td>
                  <Td>{topic.name}</Td>
                  <Td>{new Date(Number(createdAt)).toLocaleString()}</Td>
                  <Td>{new Date(Number(updatedAt)).toLocaleString()}</Td>
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
            disabled={!data?.posts.hasMore}
            isLoading={loading}
            onClick={() => {
              if (data?.posts.hasMore) {
                setCursor(
                  data?.posts.posts[data.posts.posts.length - 1].createdAt
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

export default PostsAdmin
