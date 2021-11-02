import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Link } from '@chakra-ui/react'

const NavLink = ({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) => {
  const router = useRouter()
  const textDecoration = router.asPath === href ? 'underline' : 'none'

  return (
    <NextLink href={href} passHref>
      <Link href={href} textDecoration={textDecoration}>
        {children}
      </Link>
    </NextLink>
  )
}

export default NavLink
