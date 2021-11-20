import { Resolver, Arg, Query } from 'type-graphql'
import { getNewAddress, getPort } from '../utils'

@Resolver()
class AddressResolver {
  @Query(() => String)
  async addressByChain(@Arg('chain') chain: string): Promise<string> {
    const port = getPort(chain)

    if (port === undefined) {
      return 'error: cannot find port'
    }

    const address = await getNewAddress(port)

    if (address === undefined) {
      return 'error: cannot get address'
    }

    return address
  }
}

export default AddressResolver
