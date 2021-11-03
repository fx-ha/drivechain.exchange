import { getConnection } from 'typeorm'
import { Invoice } from '../entities'
import { getPort, getReceivedByAddress, sendToAddress } from '../utils'

const handleInvoices = async () => {
  const unpaidInvoices = await Invoice.find({
    where: { hasDeposited: false },
    relations: ['receivers'],
  })

  for (const invoice of unpaidInvoices) {
    const depositChainPort = getPort(invoice.depositChain)

    if (depositChainPort === undefined) {
      console.error('can not get port for deposit chain')

      continue
    }

    const balance = await getReceivedByAddress(
      invoice.depositAddress,
      depositChainPort
    )

    if (balance < 0.1) {
      console.log(`received insufficient amount for ${invoice.depositAddress}`)

      continue
    }

    await getConnection()
      .createQueryBuilder()
      .update(Invoice)
      .set({ hasDeposited: true })
      .where('id = :id', { id: invoice.id })
      .execute()

    for (const receiver of invoice.receivers) {
      const receiverChainPort = getPort(receiver.receiveChain)

      if (receiverChainPort === undefined) {
        console.error('can not get port for receiving chain')

        continue
      }

      await sendToAddress(
        receiverChainPort,
        receiver.receiveAddress,
        receiver.allocation * balance
      )
    }

    // TODO remove unpaid invoices after x days
  }
}

export default handleInvoices
