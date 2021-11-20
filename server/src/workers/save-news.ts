import { getRepository } from 'typeorm'
import { rpcCall } from '../utils'
import { GetOpReturnDataResponse } from '../types/rpc-responses'
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
      console.error('cannot find block')

      continue
    }

    const body = await rpcCall('getopreturndata', [block.hash])

    if (body === undefined) {
      console.error('cannot get opreturn data')

      continue
    }

    const opReturnData: GetOpReturnDataResponse = JSON.parse(body).result

    for (const { fees, hex, txid } of opReturnData) {
      if (Number(fees) <= 0) {
        continue
      }

      const topic = await Topic.findOne(hex.substring(2, 10))

      if (topic === undefined) {
        console.error('cannot find topic')

        continue
      }

      await NewsItem.create({
        block,
        fee: Number(fees),
        topic,
        txid,
        content: Buffer.from(hex.substring(10), 'hex').toString('utf8'),
      }).save()
    }
  }
}

export default saveNews
