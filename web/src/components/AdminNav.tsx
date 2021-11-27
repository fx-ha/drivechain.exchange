import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Flex, Link } from '@chakra-ui/react'
import { useLogoutMutation } from '../generated/graphql'
import { apolloClient as client, useIsAuth } from '../utils'

const AdminNav = () => {
  const router = useRouter()

  useIsAuth('admin')

  const [logout] = useLogoutMutation({ client })

  return (
    <Flex direction="row" justifyContent="space-between">
      <NextLink href="/admin" passHref>
        <Link>Dashboard</Link>
      </NextLink>

      <NextLink href="/admin/blocks" passHref>
        <Link>Blocks</Link>
      </NextLink>

      <NextLink href="/admin/faucet" passHref>
        <Link>Faucet</Link>
      </NextLink>

      <NextLink href="/admin/invoices" passHref>
        <Link>Invoices</Link>
      </NextLink>

      <NextLink href="/admin/news" passHref>
        <Link>News</Link>
      </NextLink>

      <NextLink href="/admin/posts" passHref>
        <Link>Posts</Link>
      </NextLink>

      <Link
        onClick={async () => {
          await logout()
          await client.resetStore()
          router.push('/admin')
        }}
      >
        Logout
      </Link>
    </Flex>
  )
}

export default AdminNav
