import {
  Resolver,
  Arg,
  Mutation,
  InputType,
  Field,
  Query,
  ObjectType,
  UseMiddleware,
  Int,
} from 'type-graphql'
import { getConnection, LessThan } from 'typeorm'
import { Invoice, Receiver } from '../entities'
import { createLnInvoice, getNewAddress, getPort } from '../utils'
import { isAuth } from '../middleware/is-auth'

@InputType()
class ReceiverInput {
  @Field()
  receiveAddress!: string
  @Field()
  receiveChain!: string
  @Field({ defaultValue: 1 })
  allocation!: number
}

@ObjectType()
class PaginatedInvoices {
  @Field(() => [Invoice])
  invoices!: Invoice[]
  @Field()
  hasMore!: boolean
  @Field()
  total!: number
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
    let depositAddress: string | undefined
    let extra: string | undefined

    if (depositChain === 'lightning') {
      const result = await createLnInvoice(100, 'drivechain.exchange')
      depositAddress = result?.payment_hash
      extra = result?.payment_request
    } else {
      const port = getPort(depositChain)

      if (port === undefined) {
        return null
      }

      depositAddress = await getNewAddress(port)
    }

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
    invoice.extra = extra
    invoice.receivers = receivers

    return await connection.manager.save(invoice)
  }

  @Query(() => Invoice, { nullable: true })
  async invoice(@Arg('id') id: string): Promise<Invoice | undefined> {
    return await Invoice.findOne(id)
    // TODO query receivers with dataloader or type-graphql-dataloader
  }

  @Query(() => PaginatedInvoices)
  @UseMiddleware(isAuth)
  async invoices(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true })
    cursor: string | null | undefined
  ) {
    // not more than 50
    const realLimit = Math.min(50, limit)

    const reaLimitPlusOne = realLimit + 1

    const invoices = !cursor
      ? await Invoice.find({
          take: reaLimitPlusOne,
          order: { createdAt: 'DESC' },
        })
      : await Invoice.find({
          take: reaLimitPlusOne,
          order: { createdAt: 'DESC' },
          where: { createdAt: LessThan(new Date(Number(cursor))) },
        })

    const total = await Invoice.count()

    return {
      invoices: invoices.slice(0, realLimit),
      hasMore: invoices.length === reaLimitPlusOne,
      total,
    }
  }
}

export default InvoiceResolver
