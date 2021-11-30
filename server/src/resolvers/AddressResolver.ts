import { Resolver, Arg, Query, ObjectType, Field } from 'type-graphql'
import {
  checkLnInvoice,
  createLnInvoice,
  createLnUrlP,
  getNewAddress,
  getPort,
} from '../utils'

@ObjectType()
class LnInvoice {
  @Field()
  paymentHash!: string
  @Field()
  paymentRequest!: string
}

@Resolver()
class AddressResolver {
  @Query(() => String)
  async addressByChain(@Arg('chain') chain: string): Promise<string> {
    const port = getPort(chain)

    if (port === undefined) {
      return 'error: cannot find port'
    }

    const address = await getNewAddress(port)

    if (address === undefined) {
      return 'error: cannot get address'
    }

    return address
  }

  @Query(() => String, { nullable: true })
  async createLnUrlP() {
    const result = await createLnUrlP('test', 10, 100)

    if (result === undefined) {
      return
    }

    return result.lnurl
  }

  @Query(() => LnInvoice, { nullable: true })
  async createLnInvoice() {
    const result = await createLnInvoice(100, 'test')

    if (result === undefined) {
      return
    }

    return {
      paymentHash: result.payment_hash,
      paymentRequest: result.payment_request,
    }
  }

  @Query(() => Boolean, { nullable: true })
  async checkLnInvoice(@Arg('paymentHash') paymentHash: string) {
    const result = await checkLnInvoice(paymentHash)

    if (result === undefined) {
      return
    }

    return result.paid
  }
}

export default AddressResolver
