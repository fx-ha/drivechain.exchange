import { GetBlockResponse } from '../types/rpc-responses'
import { Block } from '../entities'
import { getBlockcount, rpcCall, saveGenesisBlock } from '../utils'

const saveBlocks = async (): Promise<void> => {
  const blockCount = await getBlockcount()

  if (blockCount === undefined) {
    console.error('can not connect to rpc server')

    return
  }

  const highestBlock =
    (await Block.findOne({ order: { height: 'DESC' } })) ??
    (await saveGenesisBlock())

  if (highestBlock === undefined) {
    console.error('can neither get highest block nor save genesis block')

    return
  }
  if (highestBlock.height === blockCount) {
    console.log('no new blocks')

    return
  }

  const body = await rpcCall('getblock', [highestBlock.hash])

  const result: GetBlockResponse = JSON.parse(body).result

  if (result === undefined) {
    console.error('can not get rpc data for last saved block')

    return
  }

  let nextblockhash = result.nextblockhash

  for (let i = highestBlock.height; i < blockCount; i++) {
    const body = await rpcCall('getblock', [nextblockhash])

    const block: GetBlockResponse = JSON.parse(body).result

    if (block === undefined) {
      console.error(`can not get data block with hash ${nextblockhash}`)

      return
    }

    const savedBlock = await Block.create({
      hash: block.hash,
      height: block.height,
      createdAt: new Date(block.time * 1000),
    }).save()

    if (savedBlock === undefined) {
      console.error(`can not save block with hash ${nextblockhash} to db`)

      return
    }

    nextblockhash = block.nextblockhash
  }
}

export default saveBlocks
