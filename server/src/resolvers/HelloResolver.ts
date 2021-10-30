import { Query, Resolver } from 'type-graphql'

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello(): string {
    return 'hello world'
  }
}

export default HelloResolver
