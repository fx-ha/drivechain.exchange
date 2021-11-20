import { rpcCall } from '.'

const getNewAddress = async (port: string): Promise<string | undefined> => {
  const body = await rpcCall('getnewaddress', ['', 'legacy'], port)

  if (body === undefined) {
    return
  }

  return JSON.parse(body).result
}

export default getNewAddress
