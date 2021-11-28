import {
  Resolver,
  Arg,
  Mutation,
  Query,
  ObjectType,
  Field,
  UseMiddleware,
  Int,
} from 'type-graphql'
import { LessThan } from 'typeorm'
import { FaucetRequest } from '../entities'
import { MAX_FAUCET_REQUEST } from '../constants'
import { isAuth } from '../middleware/is-auth'

@ObjectType()
class PaginatedFaucetRequests {
  @Field(() => [FaucetRequest])
  faucetRequests!: FaucetRequest[]
  @Field()
  hasMore!: boolean
  @Field()
  total!: number
}

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

  @Query(() => PaginatedFaucetRequests)
  @UseMiddleware(isAuth)
  async faucetRequests(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true })
    cursor: string | null | undefined
  ) {
    // not more than 50
    const realLimit = Math.min(50, limit)

    const reaLimitPlusOne = realLimit + 1

    const faucetRequests = !cursor
      ? await FaucetRequest.find({
          take: reaLimitPlusOne,
          order: { createdAt: 'DESC' },
        })
      : await FaucetRequest.find({
          take: reaLimitPlusOne,
          order: { createdAt: 'DESC' },
          where: { createdAt: LessThan(new Date(Number(cursor))) },
        })

    const total = await FaucetRequest.count()

    return {
      faucetRequests: faucetRequests.slice(0, realLimit),
      hasMore: faucetRequests.length === reaLimitPlusOne,
      total,
    }
  }

  // TODO faucet options
  // amount
  // timeout
}

export default FaucetResolver
