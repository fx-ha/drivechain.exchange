import { rpcCall, subtractServiceFee } from '.'

const sendToAddress = async (
  port: string,
  address: string,
  amount: number
): Promise<void> => {
  if (amount > 1.0) amount = 1.0
  amount = subtractServiceFee(amount) // TODO add chainRiskFee depending on chain

  await rpcCall(
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
}

export default sendToAddress
