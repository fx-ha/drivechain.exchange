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
import { useTopicsAdminQuery } from '../../generated/graphql'
import { apolloClient as client } from '../../utils'

const TopicsAdmin = () => {
  const [cursor, setCursor] = useState<string>()

  const { data, loading, error } = useTopicsAdminQuery({
    client,
    variables: { limit: 10, cursor },
  })

  return (
    <Layout title="Topics | Admin | Drivechain Exchange">
      <AdminNav />

      <Box mt="10" overflowX="auto">
        {error && <Box>{error.message}</Box>}
        {loading && <Box>loading...</Box>}

        <Table maxW="full" variant="simple" mb="5">
          <TableCaption placement="top">Topics</TableCaption>
          <Thead>
            <Tr>
              <Th>Hex</Th>
              <Th>Name</Th>
              <Th>Created at</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.topicsAdmin.topics.map(({ hex, name, createdAt }) => (
              <Tr key={hex}>
                <Td>{hex}</Td>
                <Td>{name}</Td>
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
            ))}
          </Tbody>
        </Table>

        <Flex w="full" alignItems="center" justifyContent="center">
          <PaginateButton
            disabled={!data?.topicsAdmin.hasMore}
            isLoading={loading}
            onClick={() => {
              if (data?.topicsAdmin.hasMore) {
                setCursor(
                  data?.topicsAdmin.topics[data.topicsAdmin.topics.length - 1]
                    .createdAt
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

export default TopicsAdmin
