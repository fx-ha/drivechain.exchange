import got from 'got'
import { DRIVENET_PORT, RPC_URL } from '../constants'

const rpcCall = async (method: string, params: any[], port = DRIVENET_PORT) => {
  const { body } = await got.post(`${RPC_URL}:${port}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '1.0',
      id: 'curltext',
      method,
      params,
    }),
  })

  return body
}

export default rpcCall
