import { getConnection } from 'typeorm'
import { Post } from '../entities'
import {
  getPort,
  getReceivedByAddress,
  rpcCall,
  subtractServiceFee,
} from '../utils'
import { MAX_COIN_NEWS_FEE, MIN_COIN_NEWS_FEE } from '../constants'

const handlePosts = async () => {
  const unpaidPosts = await Post.find({
    where: { hasDeposited: false },
    relations: ['topic'],
  })

  for (const post of unpaidPosts) {
    const depositChainPort = getPort(post.depositChain)

    if (depositChainPort === undefined) {
      console.error('cannot get port for deposit chain')

      continue
    }

    let depositAmount = await getReceivedByAddress(
      post.depositAddress,
      depositChainPort
    )

    if (depositAmount < MIN_COIN_NEWS_FEE) {
      console.log(`received insufficient amount for ${post.depositAddress}`)

      continue
    }

    if (depositAmount > MAX_COIN_NEWS_FEE) {
      depositAmount = 1.0
    }

    const coinNewsFee = subtractServiceFee(depositAmount, 0)

    const body = await rpcCall('broadcastnews', [
      post.topic.hex,
      post.text,
      coinNewsFee,
    ])

    if (body === undefined) {
      console.error('cannot broadcast news')

      await getConnection()
        .createQueryBuilder()
        .update(Post)
        .set({ hasDeposited: true, depositAmount, coinNewsFee })
        .where('id = :id', { id: post.id })
        .execute()

      continue
    }

    const txid = JSON.parse(body).result

    await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ hasDeposited: true, depositAmount, coinNewsFee, txid })
      .where('id = :id', { id: post.id })
      .execute()

    // TODO remove unpaid posts after x days
  }
}

export default handlePosts
