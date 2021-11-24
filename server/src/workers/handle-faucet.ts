import { getConnection } from 'typeorm'
import { FaucetRequest } from '../entities'
import { getPort, sendToAddress } from '../utils'

const handleFaucet = async () => {
  const faucetRequests = await FaucetRequest.find({
    where: { isPaid: false },
  })

  for (const request of faucetRequests) {
    const port = getPort(request.chain)

    if (port === undefined) {
      console.error('cannot get port for deposit chain')

      continue
    }

    const txid = await sendToAddress(port, request.address, request.amount)

    if (txid !== undefined) {
      await getConnection()
        .createQueryBuilder()
        .update(FaucetRequest)
        .set({ txid, isPaid: true })
        .where('id = :id', { id: request.id })
        .execute()
    }
  }
}

export default handleFaucet
