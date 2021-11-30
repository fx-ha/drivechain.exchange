import { Box, Tooltip, useColorModeValue, useToast } from '@chakra-ui/react'
import QRCode from 'qrcode.react'

const DepositBox = ({
  depositAddress,
  depositChain,
  extra,
}: {
  depositAddress: string
  depositChain: string
  extra: string | undefined | null
}) => {
  const toast = useToast()
  const borderColor = useColorModeValue('gray.300', 'white.400')

  if (depositChain === 'lightning' && extra) {
    return (
      <Box
        maxW="250px"
        cursor="pointer"
        title="Copy invoice"
        onClick={() => {
          navigator.clipboard.writeText(extra)
          toast({
            title: 'Copied.',
            duration: 4000,
            isClosable: true,
          })
        }}
      >
        <QRCode value={extra} size={250} />
      </Box>
    )
  }

  return (
    <Tooltip label="Copy address" placement="bottom">
      {/* TODO refactor css */}
      <Box
        w="100%"
        maxW="400px"
        fontSize={{ base: 'sm', sm: 'md' }}
        textAlign="center"
        cursor="pointer"
        border="1px solid"
        borderRadius="md"
        paddingInlineStart="4"
        paddingInlineEnd="4"
        outline="2px solid transparent"
        position="relative"
        borderColor="inherit"
        lineHeight="inherit"
        color="inherit"
        fontFamily="inherit"
        margin="0"
        p="3"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
        _hover={{ borderColor }}
        onClick={() => {
          navigator.clipboard.writeText(depositAddress)
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
  )
}

export default DepositBox
