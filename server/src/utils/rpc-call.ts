import got from 'got'
import { RPC_URL } from '../constants'

const rpcCall = async (method: string, params: any[]) => {
  const { body } = await got.post(RPC_URL, {
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
