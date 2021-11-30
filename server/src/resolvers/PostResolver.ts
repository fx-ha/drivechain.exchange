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
import { Post, Topic } from '../entities'
import { createLnInvoice, getNewAddress, getPort } from '../utils'
import { isAuth } from '../middleware/is-auth'

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts!: Post[]
  @Field()
  hasMore!: boolean
  @Field()
  total!: number
}

@Resolver()
class PostResolver {
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg('depositChain') depositChain: string,
    @Arg('header') header: string,
    @Arg('text') text: string
  ): Promise<Post | null> {
    let depositAddress: string | undefined
    let extra: string | undefined

    if (depositChain === 'lightning') {
      const result = await createLnInvoice(100, 'drivechain.exchange')
      depositAddress = result?.payment_hash
      extra = result?.payment_request
    } else {
      const port = getPort(depositChain)

      if (port === undefined) {
        return null
      }

      depositAddress = await getNewAddress(port)
    }

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
      extra,
    }).save()
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('id') id: string): Promise<Post | undefined> {
    return await Post.findOne(id, { relations: ['topic'] })
  }

  @Query(() => PaginatedPosts)
  @UseMiddleware(isAuth)
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true })
    cursor: string | null | undefined
  ) {
    // not more than 50
    const realLimit = Math.min(50, limit)

    const reaLimitPlusOne = realLimit + 1

    const posts = !cursor
      ? await Post.find({
          take: reaLimitPlusOne,
          order: { createdAt: 'DESC' },
          relations: ['topic'],
        })
      : await Post.find({
          take: reaLimitPlusOne,
          order: { createdAt: 'DESC' },
          where: { createdAt: LessThan(new Date(Number(cursor))) },
          relations: ['topic'],
        })

    const total = await Post.count()

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === reaLimitPlusOne,
      total,
    }
  }
}

export default PostResolver
