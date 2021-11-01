import { Block } from '../entities'
import { GetBlockHashResponse, GetBlockResponse } from '../types/rpc-responses'
import { rpcCall } from '.'

const saveGenesisBlock = async () => {
  const genesisHashBody = await rpcCall('getblockhash', [0])

  const genesisHash: GetBlockHashResponse = JSON.parse(genesisHashBody).result

  if (genesisHash === undefined) {
    console.error('can not get genesis hash')

    return
  }

  const genesisBlockBody = await rpcCall('getblock', [genesisHash])

  const genesisBlock: GetBlockResponse = JSON.parse(genesisBlockBody).result

  if (genesisBlock === undefined) {
    console.error('can not get data for genesis block')

    return
  }

  return await Block.create({
    hash: genesisBlock.hash,
    height: genesisBlock.height,
    createdAt: new Date(genesisBlock.time * 1000),
  }).save()
}

export default saveGenesisBlock
