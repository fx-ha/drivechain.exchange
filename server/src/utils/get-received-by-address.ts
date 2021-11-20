import { rpcCall } from '.'
import { MIN_CONF } from '../constants'

const getReceivedByAddress = async (
  address: string,
  port: string
): Promise<number> => {
  const body = await rpcCall('getreceivedbyaddress', [address, MIN_CONF], port)

  if (body === undefined) {
    console.error('cannot getreceivedbyaddress')

    return 0
  }

  const amount = JSON.parse(body).result

  return typeof amount === 'number' ? amount : 0
}

export default getReceivedByAddress
