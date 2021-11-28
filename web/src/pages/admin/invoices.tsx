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
import { useInvoicesQuery } from '../../generated/graphql'
import { apolloClient as client, truncateMiddle } from '../../utils'

const InvoicesAdmin = () => {
  const [cursor, setCursor] = useState<string>()

  const { data, loading, error } = useInvoicesQuery({
    client,
    variables: { limit: 10, cursor },
  })

  return (
    <Layout title="Invoices | Admin | Drivechain Exchange">
      <AdminNav />

      <Box mt="10" overflowX="auto">
        {error && <Box>{error.message}</Box>}
        {loading && <Box>loading...</Box>}

        <Table maxW="full" variant="simple" size="sm" mb="5">
          <TableCaption placement="top">Invoices</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Deposit address</Th>
              <Th>Deposit chain</Th>
              <Th>Has deposited?</Th>
              <Th>Deposit amount</Th>
              <Th>Receive estimate</Th>
              <Th>Created at</Th>
              <Th>Updated at</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.invoices.invoices.map(
              ({
                id,
                depositAddress,
                depositChain,
                hasDeposited,
                depositAmount,
                receiveEstimate,
                createdAt,
                updatedAt,
              }) => (
                <Tr key={id}>
                  <Td>{id.substring(0, 8)}</Td>
                  <Td>{truncateMiddle(depositAddress)}</Td>
                  <Td>{depositChain}</Td>
                  <Td>{hasDeposited ? 'x' : ''}</Td>
                  <Td>{depositAmount}</Td>
                  <Td>{receiveEstimate}</Td>
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
            disabled={!data?.invoices.hasMore}
            isLoading={loading}
            onClick={() => {
              if (data?.invoices.hasMore) {
                setCursor(
                  data?.invoices.invoices[data.invoices.invoices.length - 1]
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

export default InvoicesAdmin
