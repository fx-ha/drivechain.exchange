import { rpcCall } from '.'

const estimateSmartFee = async (
  port: string,
  conf_target: number
): Promise<number> => {
  const default_feerate = 0.001 // sats per kilobyte

  const body = await rpcCall(
    'estimatesmartfee',
    [conf_target, 'CONSERVATIVE'],
    port
  )

  if (body === undefined) {
    console.error('cannot estimate smart fee')

    return default_feerate
  }

  const result = JSON.parse(body).result

  return typeof result === 'number' ? result : default_feerate
}

export default estimateSmartFee
