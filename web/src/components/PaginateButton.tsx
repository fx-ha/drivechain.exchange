import { MouseEventHandler } from 'react'
import { Button, useColorModeValue } from '@chakra-ui/react'

const PaginateButton = ({
  disabled,
  active,
  isLoading,
  onClick,
  children,
}: {
  disabled?: boolean
  active?: boolean
  isLoading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  children: React.ReactNode
}) => {
  const bg = useColorModeValue('gray.600', 'gray.500')
  const color = useColorModeValue('white', 'gray.200')

  return (
    <Button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.700', 'gray.200')}
      opacity={disabled ? 0.6 : undefined}
      _hover={!disabled ? { bg, color } : undefined}
      cursor={disabled ? 'not-allowed' : undefined}
      {...(active && { bg, color })}
      onClick={onClick}
      isLoading={isLoading}
    >
      {children}
    </Button>
  )
}

export default PaginateButton
