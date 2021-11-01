import { Arg, Query, Resolver } from 'type-graphql'
import { NewsItem } from '../entities'

@Resolver()
class NewsResolver {
  @Query(() => [NewsItem])
  async newsByTopic(@Arg('topic') topic: string): Promise<NewsItem[]> {
    return await NewsItem.find({
      where: { topic },
      relations: ['block', 'topic'],
    })
  }
}

export default NewsResolver
