import { getConnection } from 'typeorm'
import { TwitterApi } from 'twitter-api-v2'
import { rpcCall } from '../utils'
import { CnbRequest } from '../entities'

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN).v2

const handleCnbRequests = async () => {
  const requests = await CnbRequest.find({ where: { hasDeposited: false } })

  for (const request of requests) {
    const text = `${request.text} - @${request.username} https://twitter.com/twitter/status/${request.targetId}`

    const body = await rpcCall('broadcastnews', ['42042069', text, 0.0001])

    if (body === undefined) {
      console.error('cannot broadcast cnb request')

      continue
    }

    const txid = JSON.parse(body).result

    await getConnection()
      .createQueryBuilder()
      .update(CnbRequest)
      .set({ hasDeposited: true, txid })
      .where('id = :id', { id: request.id })
      .execute()

    const status = `Tweet saved! Transaction ID: ${txid}. Follow CoinNews on drivechain.exchange/news/42042069 or run your own node drivechain.info`

    await client.reply(status, request.mentionId)
  }
}

export default handleCnbRequests
