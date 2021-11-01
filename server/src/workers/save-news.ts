import { getRepository } from 'typeorm'
import { rpcCall } from '../utils'
import {
  GetOpReturnDataResponse,
  GetRawTransactionResponse,
} from '../types/rpc-responses'
import { Block, NewsItem, Topic } from '../entities'
import { NEWS_MIN_START_HEIGHT } from '../constants'

const saveNews = async () => {
  const highestBlock = await Block.findOne({ order: { height: 'DESC' } })

  if (highestBlock === undefined) {
    console.error('no blocks found, save blocks first')

    return
  }

  const newsWithHighestBlockHeight = await getRepository(NewsItem)
    .createQueryBuilder('news_item')
    .leftJoinAndSelect('news_item.block', 'block')
    .orderBy('block.height', 'DESC')
    .getOne()

  const startFromBlockHeight =
    newsWithHighestBlockHeight !== undefined
      ? newsWithHighestBlockHeight.block.height
      : NEWS_MIN_START_HEIGHT

  for (let i = startFromBlockHeight; i < highestBlock.height; i++) {
    const block = await Block.findOne({ where: { height: i } })

    if (block === undefined) {
      console.error('can not find block')

      continue
    }

    const body = await rpcCall('getopreturndata', [block.hash])

    const opReturnData: GetOpReturnDataResponse = JSON.parse(body).result

    if (opReturnData === undefined) {
      console.error('can not get opreturn data')

      continue
    }

    for (const txn of opReturnData) {
      if (Number(txn.fees) > 0) {
        const body = await rpcCall('getrawtransaction', [txn.txid, true])

        const rawTransaction: GetRawTransactionResponse =
          JSON.parse(body).result

        if (rawTransaction === undefined) {
          console.error('can not get raw transaction')

          continue
        }

        const hex = rawTransaction.vout.find(
          (el) =>
            el.scriptPubKey !== undefined &&
            el.scriptPubKey.hex.startsWith('6a')
        )?.scriptPubKey.hex

        if (hex === undefined) {
          console.error('can not find hex')

          continue
        }

        const topic = await Topic.findOne(hex.substring(2, 10))

        if (topic === undefined) {
          console.error('can not find topic')

          continue
        }

        await NewsItem.create({
          block,
          fee: Number(txn.fees),
          topic,
          txid: txn.txid,
          content: Buffer.from(hex.substring(10), 'hex').toString('utf8'),
        }).save()
      }
    }
  }
}

export default saveNews
