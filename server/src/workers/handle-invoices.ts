import { getConnection } from 'typeorm'
import { Invoice, Receiver } from '../entities'
import {
  checkLnInvoice,
  getPort,
  getReceivedByAddress,
  sendToAddress,
  subtractServiceFee,
} from '../utils'
import { MIN_EXCHANGE_AMOUNT } from '../constants'

// TODO needs refactoring
const handleInvoices = async () => {
  const unpaidInvoices = await Invoice.find({
    where: { hasDeposited: false },
    relations: ['receivers'],
  })

  for (const invoice of unpaidInvoices) {
    let depositAmount = 0

    if (invoice.depositChain === 'lightning') {
      const result = await checkLnInvoice(invoice.depositAddress)
      const isPaid = result?.paid

      if (!isPaid) {
        continue
      }

      // ln invoice asks for 100 sats
      // exchange rate: 100 ln sats = 0.5 drivenet btc
      depositAmount = 0.5
    } else {
      const depositChainPort = getPort(invoice.depositChain)

      if (depositChainPort === undefined) {
        console.error('cannot get port for deposit chain')

        continue
      }

      depositAmount = await getReceivedByAddress(
        invoice.depositAddress,
        depositChainPort
      )

      if (depositAmount < MIN_EXCHANGE_AMOUNT) {
        console.log(
          `received insufficient amount for ${invoice.depositAddress}`
        )

        continue
      }
    }

    const receiveEstimate = subtractServiceFee(depositAmount, 0)

    await getConnection()
      .createQueryBuilder()
      .update(Invoice)
      .set({
        hasDeposited: true,
        depositAmount,
        receiveEstimate,
      })
      .where('id = :id', { id: invoice.id })
      .execute()

    for (const receiver of invoice.receivers) {
      const receiverChainPort = getPort(receiver.receiveChain)

      if (receiverChainPort === undefined) {
        console.error('cannot get port for receiving chain')

        continue
      }

      const txid = await sendToAddress(
        receiverChainPort,
        receiver.receiveAddress,
        receiver.allocation * depositAmount
      )

      if (txid !== undefined) {
        await getConnection()
          .createQueryBuilder()
          .update(Receiver)
          .set({ txid })
          .where('id = :id', { id: receiver.id })
          .execute()
      }
    }

    // TODO remove unpaid invoices after x days
  }
}

export default handleInvoices
