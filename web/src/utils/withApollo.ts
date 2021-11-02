import { withApollo as createWithApollo } from 'next-apollo'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { isServer } from '.'

const createClient = (ctx: any) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: 'include',
    headers: {
      cookie: (isServer() ? ctx?.req?.headers.cookie : undefined) || '',
    },
    cache: new InMemoryCache(),
  })

const withApollo = createWithApollo(createClient)

export default withApollo
