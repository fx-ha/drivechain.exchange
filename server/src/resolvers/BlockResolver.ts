import {
  Resolver,
  Query,
  UseMiddleware,
  ObjectType,
  Field,
  Arg,
  Int,
} from 'type-graphql'
import { LessThan } from 'typeorm'
import { isAuth } from '../middleware/is-auth'
import { Block } from '../entities'

@ObjectType()
class PaginatedBlocks {
  @Field(() => [Block])
  blocks!: Block[]
  @Field()
  hasMore!: boolean
  @Field()
  total!: number
}

@Resolver()
class BlockResolver {
  @Query(() => PaginatedBlocks)
  @UseMiddleware(isAuth)
  async blocks(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => Int, { nullable: true })
    cursor: number | null | undefined
  ) {
    // not more than 50
    const realLimit = Math.min(50, limit)

    const reaLimitPlusOne = realLimit + 1

    const blocks = !cursor
      ? await Block.find({
          take: reaLimitPlusOne,
          order: { height: 'DESC' },
        })
      : await Block.find({
          take: reaLimitPlusOne,
          order: { height: 'DESC' },
          where: { height: LessThan(cursor) },
        })

    const total = await Block.count()

    return {
      blocks: blocks.slice(0, realLimit),
      hasMore: blocks.length === reaLimitPlusOne,
      total,
    }
  }
}

export default BlockResolver
