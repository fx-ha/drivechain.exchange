import { Resolver, Arg, Query } from 'type-graphql'
import { getNewAddress, getPort } from '../utils'

@Resolver()
class AddressResolver {
  @Query(() => String)
  async addressByChain(@Arg('chain') chain: string): Promise<string> {
    const port = getPort(chain)

    if (port === undefined) {
      return 'error'
    }

    return await getNewAddress(port)
  }
}

export default AddressResolver
