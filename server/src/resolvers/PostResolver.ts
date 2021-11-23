import { Resolver, Arg, Mutation, Query } from 'type-graphql'
import { Post, Topic } from '../entities'
import { getNewAddress, getPort } from '../utils'

@Resolver()
class PostResolver {
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg('depositChain') depositChain: string,
    @Arg('header') header: string,
    @Arg('text') text: string
  ): Promise<Post | null> {
    const port = getPort(depositChain)

    if (port === undefined) {
      return null
    }

    const depositAddress = await getNewAddress(port)

    if (depositAddress === undefined) {
      console.error('cannot get deposit address')

      return null
    }

    const topic = await Topic.findOne(header)

    if (topic === undefined) {
      console.error('cannot find topic')

      return null
    }

    return await Post.create({
      depositChain,
      depositAddress,
      text,
      topic,
    }).save()
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('id') id: string): Promise<Post | undefined> {
    return await Post.findOne(id, { relations: ['topic'] })
  }
}

export default PostResolver
