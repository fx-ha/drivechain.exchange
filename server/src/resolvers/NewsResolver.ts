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
import { NewsItem } from '../entities'
import { isAuth } from '../middleware/is-auth'

@ObjectType()
class PaginatedNewsItems {
  @Field(() => [NewsItem])
  news!: NewsItem[]
  @Field()
  hasMore!: boolean
  @Field()
  total!: number
}

@Resolver()
class NewsResolver {
  @Query(() => [NewsItem])
  async newsByTopic(@Arg('topic') topic: string): Promise<NewsItem[]> {
    return await NewsItem.find({
      where: { topic },
      relations: ['block', 'topic'],
    })
  }

  @Query(() => PaginatedNewsItems)
  @UseMiddleware(isAuth)
  async newsItems(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true })
    cursor: string | null | undefined
  ) {
    // not more than 50
    const realLimit = Math.min(50, limit)

    const reaLimitPlusOne = realLimit + 1

    const newsItems = !cursor
      ? await NewsItem.find({
          take: reaLimitPlusOne,
          order: { createdAt: 'DESC' },
          relations: ['block', 'topic'],
        })
      : await NewsItem.find({
          take: reaLimitPlusOne,
          order: { createdAt: 'DESC' },
          where: { createdAt: LessThan(new Date(Number(cursor))) },
          relations: ['block', 'topic'],
        })

    const total = await NewsItem.count()

    return {
      news: newsItems.slice(0, realLimit),
      hasMore: newsItems.length === reaLimitPlusOne,
      total,
    }
  }
}

export default NewsResolver
