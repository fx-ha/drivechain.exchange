import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Select,
  Spacer,
} from '@chakra-ui/react'
import { AiOutlineSwap } from 'react-icons/ai'
import { Layout } from '../components'
import { useCreateInvoiceMutation } from '../generated/graphql'
import { apolloClient as client } from '../utils'

const Home = () => {
  const router = useRouter()

  const [depositChain, setDeposit] = useState('zside')
  const [receiveChain, setReceive] = useState('drivenet')

  const [receiveAddress, setReceiveAddress] = useState('')

  const [createInvoice, { loading, error }] = useCreateInvoiceMutation({
    client,
  })

  // TODO refactor with formik
  const handleExchange = async (): Promise<void> => {
    if (receiveAddress === '') {
      alert('Please provide your receive address')
    } else {
      const result = await createInvoice({
        variables: {
          depositChain,
          receiverData: { receiveAddress, receiveChain },
        },
      })

      if (!result.data || !result.data.createInvoice || error) {
        alert('Error creating invoice')
      } else {
        router.push(`/invoice/${result.data.createInvoice.id}`)
      }
    }
  }

  return (
    <Layout>
      <Flex>
        <Spacer />
        <Box w={{ base: '340px', sm: '400px' }}>
          <Flex alignItems="center" justifyContent="center" mb="8">
            <Box mr="10">
              <Box mb="3">Send to</Box>
              <Select
                value={depositChain}
                onChange={(e) => setDeposit(e.currentTarget.value)}
              >
                <option value="drivenet">Drivenet</option>
                <option value="testchain">Testchain</option>
                <option value="thunder">Thunder</option>
                <option value="trainchain">Trainchain</option>
                <option value="zside">Zside</option>
                <option value="lightning">Lightning</option>
              </Select>
            </Box>

            <Icon
              as={AiOutlineSwap}
              title="switch chains"
              boxSize="6"
              cursor="pointer"
              onClick={() => {
                setDeposit(receiveChain)
                setReceive(
                  depositChain === 'lightning' ? 'drivenet' : depositChain
                )
              }}
            />

            <Box ml="10">
              <Box mb="3">Receive on</Box>
              <Select
                value={receiveChain}
                onChange={(e) => setReceive(e.currentTarget.value)}
              >
                <option value="drivenet">Drivenet</option>
                <option value="testchain">Testchain</option>
                <option value="thunder">Thunder</option>
                <option value="trainchain">Trainchain</option>
                <option value="zside">Zside</option>
              </Select>
            </Box>
          </Flex>

          <Flex alignItems="center" justifyContent="center" direction="column">
            <Input
              textAlign="center"
              fontSize={{ base: 'sm', sm: 'md' }}
              w="100%"
              maxW="352px"
              mb="8"
              value={receiveAddress}
              placeholder="Your receiving address"
              onChange={(e) => setReceiveAddress(e.currentTarget.value)}
            />

            <Box mb="8">
              <Button onClick={handleExchange} isLoading={loading}>
                Exchange now
              </Button>
            </Box>
          </Flex>
        </Box>
        <Spacer />
      </Flex>
    </Layout>
  )
}

export default Home
