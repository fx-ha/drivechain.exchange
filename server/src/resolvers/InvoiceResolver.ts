import { Resolver, Arg, Mutation, InputType, Field, Query } from 'type-graphql'
import { getConnection } from 'typeorm'
import { Receiver } from '../entities'
import { Invoice } from '../entities'
import { getNewAddress, getPort } from '../utils'

@InputType()
class ReceiverInput {
  @Field()
  receiveAddress!: string
  @Field()
  receiveChain!: string
  @Field({ defaultValue: 1 })
  allocation!: number
}

@Resolver()
class InvoiceResolver {
  @Mutation(() => Invoice, { nullable: true })
  async createInvoice(
    @Arg('depositChain') depositChain: string,
    @Arg('receiverData', () => [ReceiverInput])
    receiverData: ReceiverInput[]
  ): Promise<Invoice | null> {
    // TODO validation:
    // must be a valid address for selected chain
    // each allocation must be between 0 and 1
    // sum of allocations must be 1
    // if fixed rate selected && receiveAmount < fees: warning
    const port = getPort(depositChain)

    if (port === undefined) {
      return null
    }

    const depositAddress = await getNewAddress(port)

    if (depositAddress === undefined) {
      return null
    }

    const connection = getConnection()

    const receivers: Receiver[] = []

    for (const input of receiverData) {
      const receiver = new Receiver()
      receiver.allocation = input.allocation
      receiver.receiveAddress = input.receiveAddress
      receiver.receiveChain = input.receiveChain
      receivers.push(receiver)
    }

    const invoice = new Invoice()
    invoice.depositChain = depositChain
    invoice.depositAddress = depositAddress
    invoice.receivers = receivers

    return await connection.manager.save(invoice)
  }

  @Query(() => Invoice, { nullable: true })
  async invoice(@Arg('id') id: string): Promise<Invoice | undefined> {
    return await Invoice.findOne(id)
    // TODO query receivers with dataloader or type-graphql-dataloader
  }
}

export default InvoiceResolver
