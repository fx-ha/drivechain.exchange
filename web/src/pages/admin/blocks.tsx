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
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { AdminNav, Layout, PaginateButton } from '../../components'
import { useBlocksQuery } from '../../generated/graphql'
import { apolloClient as client, truncateMiddle } from '../../utils'

const BlocksAdmin = () => {
  const [cursor, setCursor] = useState<number>()

  const { data, loading, error } = useBlocksQuery({
    client,
    variables: { limit: 10, cursor },
  })

  return (
    <Layout title="Blocks | Admin | Drivechain Exchange">
      <AdminNav />

      <Box mt="10">
        {error && <Box>{error.message}</Box>}
        {loading && <Box>loading...</Box>}

        <Table variant="simple" mb="5">
          <TableCaption placement="top">Blocks</TableCaption>
          <Thead>
            <Tr>
              <Th>Hash</Th>
              <Th isNumeric>Height</Th>
              <Th isNumeric>Created At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.blocks.blocks.map(({ hash, height, createdAt }) => (
              <Tr key={hash}>
                <Td>{truncateMiddle(hash)}</Td>
                <Td isNumeric>{height}</Td>
                <Td isNumeric>
                  {new Date(Number(createdAt)).toLocaleString()}
                </Td>
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
            disabled={
              data?.blocks.total !== undefined
                ? data?.blocks.blocks[0].height === data?.blocks.total - 1
                : undefined
            }
            isLoading={loading}
            onClick={() => {
              if (data?.blocks.blocks[0].height) {
                setCursor(data.blocks.blocks[0].height + 11)
              }
            }}
          >
            <Icon as={IoIosArrowBack} boxSize={4} />
          </PaginateButton>
          <PaginateButton
            disabled={!data?.blocks.hasMore}
            isLoading={loading}
            onClick={() => {
              setCursor(
                data?.blocks.blocks[data.blocks.blocks.length - 1].height
              )
            }}
          >
            <Icon as={IoIosArrowForward} boxSize={4} />
          </PaginateButton>
        </Flex>
      </Box>
    </Layout>
  )
}

export default BlocksAdmin
