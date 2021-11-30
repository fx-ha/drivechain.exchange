import got from 'got'
import { LnCheckInvoiceResponse } from '../types/ln'

const checkLnInvoice = async (paymentHash: string) => {
  try {
    const { body } = await got.get(
      `${process.env.LNBITS_URL}/api/v1/payments/${paymentHash}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': process.env.LNBITS_API_KEY,
        },
      }
    )

    return JSON.parse(body) as LnCheckInvoiceResponse
  } catch (error) {
    console.error(error)
    return
  }
}

export default checkLnInvoice
