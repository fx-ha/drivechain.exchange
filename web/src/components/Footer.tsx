import { Box, Container, Divider, Link } from '@chakra-ui/layout'
import { Icon, Tooltip } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'

const Footer = () => (
  <Container as="footer" maxW="3xl" mt="auto">
    <Divider mt={10} mb={1} />

    <Box mb={1} textAlign="center">
      <Tooltip label="Code on Github">
        <Link isExternal href="https://github.com/fx-ha/drivechain.exchange">
          <Icon as={FaGithub} />
        </Link>
      </Tooltip>
    </Box>
  </Container>
)

export default Footer
