import { rpcCall } from '.'
import { MIN_CONF } from '../constants'

const getReceivedByAddress = async (
  address: string,
  port: string
): Promise<number> => {
  const body = await rpcCall('getreceivedbyaddress', [address, MIN_CONF], port)

  const amount = JSON.parse(body).result

  return typeof amount === 'number' ? amount : 0
}

export default getReceivedByAddress
