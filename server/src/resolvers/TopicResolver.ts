import { Query, Resolver } from 'type-graphql'
import { Topic } from '../entities'

@Resolver()
class NewsResolver {
  @Query(() => [Topic])
  async topics(): Promise<Topic[]> {
    return await Topic.find()
  }
}

export default NewsResolver
