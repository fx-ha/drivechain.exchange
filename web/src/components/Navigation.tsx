import NextLink from 'next/link'
import {
  Flex,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { BiMoon, BiSun } from 'react-icons/bi'
import { NavLink } from '.'

const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Flex as="nav" alignItems="center" mt={{ base: '5', sm: '10' }} mb="16">
      <NextLink href="/" passHref>
        <Link fontSize="lg">Exchange</Link>
      </NextLink>

      <Spacer />

      <HStack spacing={3}>
        <NavLink href="/news">Coin News</NavLink>
        <Text>|</Text>
        <NavLink href="/about">About</NavLink>
        <Text>|</Text>
        <Icon
          onClick={toggleColorMode}
          as={isDark ? BiSun : BiMoon}
          cursor="pointer"
          boxSize={5}
        />
      </HStack>
    </Flex>
  )
}

export default Navigation
