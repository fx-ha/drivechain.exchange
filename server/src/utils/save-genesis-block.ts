import { Block } from '../entities'
import { GetBlockHashResponse, GetBlockResponse } from '../types/rpc-responses'
import { rpcCall } from '.'

const saveGenesisBlock = async () => {
  const genesisHashBody = await rpcCall('getblockhash', [0])

  if (genesisHashBody === undefined) {
    console.error('cannot get genesis hash')

    return
  }

  const genesisHash: GetBlockHashResponse = JSON.parse(genesisHashBody).result

  const genesisBlockBody = await rpcCall('getblock', [genesisHash])

  if (genesisBlockBody === undefined) {
    console.error('cannot get data for genesis block')

    return
  }

  const genesisBlock: GetBlockResponse = JSON.parse(genesisBlockBody).result

  return await Block.create({
    hash: genesisBlock.hash,
    height: genesisBlock.height,
    createdAt: new Date(genesisBlock.time * 1000),
  }).save()
}

export default saveGenesisBlock
