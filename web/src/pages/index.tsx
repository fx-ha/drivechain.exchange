import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Select,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { AiOutlineSwap } from 'react-icons/ai'
import { Layout } from '../components'
import { useCreateInvoiceMutation } from '../generated/graphql'
import { apolloClient as client } from '../utils'

const Home = () => {
  const borderColor = useColorModeValue(
    'var(--chakra-colors-gray-300)',
    'var(--chakra-colors-whiteAlpha-400)'
  )
  const toast = useToast()

  const [depositChain, setDeposit] = useState('zside')
  const [receiveChain, setReceive] = useState('drivenet')

  const [receiveAddress, setReceiveAddress] = useState('')
  const [depositAddress, setDepositAddress] = useState('')

  const [showDepositAddress, setShowDepositAddress] = useState(false)

  const [createInvoice, { loading, error }] = useCreateInvoiceMutation({
    client,
  })

  const handleExchange = async (): Promise<void> => {
    if (receiveAddress === '') {
      alert('Please provide your receive address')
      setShowDepositAddress(false)
    } else {
      const result = await createInvoice({
        variables: {
          depositChain,
          receiverData: { receiveAddress, receiveChain },
        },
      })

      if (!result.data || !result.data.createInvoice || error) {
        alert('Error creating invoice')
        setShowDepositAddress(false)
      } else {
        setDepositAddress(result.data.createInvoice.depositAddress)
        setShowDepositAddress(true)
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
              </Select>
            </Box>

            <Icon
              as={AiOutlineSwap}
              title="switch chains"
              boxSize="6"
              cursor="pointer"
              onClick={() => {
                setDeposit(receiveChain)
                setReceive(depositChain)
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

            {showDepositAddress && (
              <>
                <Text mb="2">Send between 0.1 and 1.0 BTC (Testnet) to</Text>

                <Tooltip label="Copy address" placement="bottom">
                  <Box
                    w="100%"
                    maxW="352px"
                    fontSize={{ base: 'sm', sm: 'md' }}
                    textAlign="center"
                    value={depositAddress}
                    cursor="pointer"
                    border="1px solid"
                    borderRadius="md"
                    paddingInlineStart="4"
                    paddingInlineEnd="4"
                    outline="2px solid transparent"
                    height="10"
                    position="relative"
                    borderColor="inherit"
                    padding="0"
                    lineHeight="inherit"
                    color="inherit"
                    fontFamily="inherit"
                    margin="0"
                    pt="2"
                    _hover={{ borderColor }}
                    onClick={(e) => {
                      navigator.clipboard.writeText(
                        e.currentTarget.textContent !== null
                          ? e.currentTarget.textContent
                          : ''
                      )
                      toast({
                        title: 'Copied.',
                        duration: 4000,
                        isClosable: true,
                      })
                    }}
                  >
                    {depositAddress}
                  </Box>
                </Tooltip>
              </>
            )}
          </Flex>
        </Box>
        <Spacer />
      </Flex>
    </Layout>
  )
}

export default Home
