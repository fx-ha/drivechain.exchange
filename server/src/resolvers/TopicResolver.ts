import {
  Arg,
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { LessThan } from 'typeorm'
import { Topic } from '../entities'
import { isAuth } from '../middleware/is-auth'

@ObjectType()
class PaginatedTopics {
  @Field(() => [Topic])
  topics!: Topic[]
  @Field()
  hasMore!: boolean
  @Field()
  total!: number
}

@Resolver()
class TopicResolver {
  @Query(() => [Topic])
  async topics(): Promise<Topic[]> {
    return await Topic.find()
  }

  @Query(() => PaginatedTopics)
  @UseMiddleware(isAuth)
  async topicsAdmin(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true })
    cursor: string | null | undefined
  ) {
    // not more than 50
    const realLimit = Math.min(50, limit)

    const reaLimitPlusOne = realLimit + 1

    const topics = !cursor
      ? await Topic.find({
          take: reaLimitPlusOne,
          order: { createdAt: 'DESC' },
        })
      : await Topic.find({
          take: reaLimitPlusOne,
          order: { createdAt: 'DESC' },
          where: { createdAt: LessThan(new Date(Number(cursor))) },
        })

    const total = await Topic.count()

    return {
      topics: topics.slice(0, realLimit),
      hasMore: topics.length === reaLimitPlusOne,
      total,
    }
  }
}

export default TopicResolver
