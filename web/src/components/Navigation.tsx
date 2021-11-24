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
  const colorModeIcon = { dark: BiSun, light: BiMoon }

  return (
    <Flex as="nav" alignItems="center" mt={{ base: '5', sm: '8' }} mb="16">
      <NextLink href="/" passHref>
        <Link fontSize={{ base: 'md', sm: 'lg' }}>Exchange</Link>
      </NextLink>

      <Spacer />

      <HStack spacing={3}>
        <NavLink href="/news/a1a1a1a1">News</NavLink>
        <Text>|</Text>
        <NavLink href="/faucet">Faucet</NavLink>
        <Text>|</Text>
        <NavLink href="/about">About</NavLink>
        <Text>|</Text>
        <Icon
          onClick={toggleColorMode}
          as={colorModeIcon[colorMode]}
          cursor="pointer"
          boxSize={5}
          pb="0.5"
        />
      </HStack>
    </Flex>
  )
}

export default Navigation
