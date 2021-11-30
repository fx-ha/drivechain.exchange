import got from 'got'
import { LnCreateInvoiceResponse } from '../types/ln'

const createLnInvoice = async (amount: number, memo: string) => {
  try {
    const { body } = await got.post(
      `${process.env.LNBITS_URL}/api/v1/payments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': process.env.LNBITS_API_KEY,
        },
        body: JSON.stringify({
          out: false,
          amount,
          memo,
        }),
      }
    )

    return JSON.parse(body) as LnCreateInvoiceResponse
  } catch (error) {
    console.error(error)
    return
  }
}

export default createLnInvoice
