import { GetBlockResponse } from '../types/rpc-responses'
import { Block } from '../entities'
import { getBlockcount, rpcCall, saveGenesisBlock } from '../utils'

const saveBlocks = async (): Promise<void> => {
  const blockCount = await getBlockcount()

  if (blockCount === undefined) {
    console.error('cannot connect to rpc server')

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

  const highestBlockBody = await rpcCall('getblock', [highestBlock.hash])

  if (highestBlockBody === undefined) {
    console.error('cannot get rpc data for last saved block')

    return
  }

  const result: GetBlockResponse = JSON.parse(highestBlockBody).result

  let nextblockhash = result.nextblockhash

  for (let i = highestBlock.height; i < blockCount; i++) {
    const nextBlockBody = await rpcCall('getblock', [nextblockhash])

    if (nextBlockBody === undefined) {
      console.error(`cannot get data block with hash ${nextblockhash}`)

      return
    }

    const nextBlock: GetBlockResponse = JSON.parse(nextBlockBody).result

    const savedBlock = await Block.create({
      hash: nextBlock.hash,
      height: nextBlock.height,
      createdAt: new Date(nextBlock.time * 1000),
    }).save()

    if (savedBlock === undefined) {
      console.error(`cannot save block with hash ${nextblockhash} to db`)

      return
    }

    nextblockhash = nextBlock.nextblockhash
  }
}

export default saveBlocks
