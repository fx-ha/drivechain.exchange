import { rpcCall } from '.'
import { GetBlockCountResponse } from '../types/rpc-responses'

const getBlockcount = async (): Promise<GetBlockCountResponse> => {
  const countBody = await rpcCall('getblockcount', [])

  return JSON.parse(countBody).result
}

export default getBlockcount
