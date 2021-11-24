import { Resolver, Arg, Mutation, Query } from 'type-graphql'
import { FaucetRequest } from '../entities'
import { MAX_FAUCET_REQUEST } from '../constants'

@Resolver()
class FaucetResolver {
  @Mutation(() => FaucetRequest, { nullable: true })
  async createFaucetRequest(
    @Arg('address') address: string,
    @Arg('chain') chain: string
  ): Promise<FaucetRequest | null> {
    // TODO validation:
    // must be a valid address for selected chain
    const amount = MAX_FAUCET_REQUEST

    const lastRequest = await FaucetRequest.findOne({
      order: { updatedAt: 'DESC' },
    })

    // limit requests to 1 per 5 minutes
    if (
      lastRequest?.updatedAt &&
      Date.now() - lastRequest?.updatedAt.getTime() < 1000 * 60 * 5
    ) {
      return null // TODO return remaining wait time
    }

    return await FaucetRequest.create({
      chain,
      address,
      amount,
    }).save()
  }

  @Query(() => FaucetRequest, { nullable: true })
  async faucetRequest(
    @Arg('id') id: string
  ): Promise<FaucetRequest | undefined> {
    return await FaucetRequest.findOne(id)
  }
}

export default FaucetResolver
