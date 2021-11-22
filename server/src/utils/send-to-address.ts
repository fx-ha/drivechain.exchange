import { rpcCall, subtractServiceFee } from '.'
import { MAX_EXCHANGE_AMOUNT } from '../constants'

const sendToAddress = async (
  port: string,
  address: string,
  amount: number
): Promise<string | undefined> => {
  if (amount > MAX_EXCHANGE_AMOUNT) {
    amount = 1.0
  }

  amount = subtractServiceFee(amount) // TODO add chainRiskFee depending on chain

  const body = await rpcCall(
    'sendtoaddress',
    [
      address,
      amount,
      'drivechain exchange', // comment
      'user', // comment_to
      true, // subtractfeefromamount
      true, // replaceable
      1, // conf_target in blocks
      'CONSERVATIVE', // estimate_mode
    ],
    port
  )

  if (body === undefined) {
    console.error('cannot send to address')

    return
  }

  return JSON.parse(body).result
}

export default sendToAddress
