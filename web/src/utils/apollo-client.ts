import { ApolloClient, InMemoryCache } from '@apollo/client'
// import { isServer } from '.'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  credentials: 'include',
  // headers: {
  //   cookie: (isServer() ? ctx?.req?.headers.cookie : undefined) || '',
  // },
  cache: new InMemoryCache(),
})

export default client
