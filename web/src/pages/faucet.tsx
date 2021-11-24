import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Input, Select, Spacer } from '@chakra-ui/react'
import { Layout } from '../components'
import { apolloClient as client } from '../utils'
import { useCreateFaucetRequestMutation } from '../generated/graphql'

const Faucet = () => {
  const router = useRouter()

  const [chain, setChain] = useState('drivenet')

  const [address, setAddress] = useState('')

  const [createFaucetRequest, { loading, error }] =
    useCreateFaucetRequestMutation({
      client,
    })

  // TODO refactor with formik
  const handleExchange = async (): Promise<void> => {
    if (address === '') {
      alert('Please provide your address')
    } else {
      const result = await createFaucetRequest({
        variables: {
          chain,
          address,
        },
      })

      if (!result.data || error) {
        alert('Error creating invoice')
      } else if (!result.data.createFaucetRequest) {
        alert('Faucet is limited to one request every 5 minutes')
      } else {
        router.push(`/faucet/${result.data.createFaucetRequest.id}`)
      }
    }
  }

  return (
    <Layout title="Faucet | Drivechain Exchange">
      <Flex>
        <Spacer />
        <Box w={{ base: '340px', sm: '400px' }}>
          <Flex alignItems="center" justifyContent="center" mb="8">
            <Box>
              <Select
                value={chain}
                onChange={(e) => setChain(e.currentTarget.value)}
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
              value={address}
              placeholder="Your address"
              onChange={(e) => setAddress(e.currentTarget.value)}
            />

            <Box mb="8">
              <Button onClick={handleExchange} isLoading={loading}>
                Request BTC
              </Button>
            </Box>
          </Flex>
        </Box>
        <Spacer />
      </Flex>
    </Layout>
  )
}

export default Faucet
