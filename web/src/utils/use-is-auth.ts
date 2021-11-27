import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMeQuery } from '../generated/graphql'
import { apolloClient as client } from '.'

const useIsAuth = (role?: string) => {
  const { data, loading } = useMeQuery({ client })
  const router = useRouter()

  useEffect(() => {
    if ((!loading && !data?.me) || data?.me?.role !== role) {
      router.push('/admin/login')
    }
  }, [loading, data, router, role])
}

export default useIsAuth
