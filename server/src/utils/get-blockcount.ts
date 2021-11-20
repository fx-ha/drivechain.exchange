import { rpcCall } from '.'
import { GetBlockCountResponse } from '../types/rpc-responses'

const getBlockcount = async (): Promise<GetBlockCountResponse | undefined> => {
  const body = await rpcCall('getblockcount', [])

  if (body === undefined) {
    return
  }

  return JSON.parse(body).result
}

export default getBlockcount
