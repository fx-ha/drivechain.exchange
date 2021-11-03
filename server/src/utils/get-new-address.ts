import { rpcCall } from '.'

const getNewAddress = async (port: string): Promise<string> => {
  const body = await rpcCall('getnewaddress', ['', 'legacy'], port)

  return JSON.parse(body).result
}

export default getNewAddress
