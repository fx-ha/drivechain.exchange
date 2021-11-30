import got from 'got'
import { LnUrlPCreatePayLinkResponse } from '../types/ln'

const createLnUrlP = async (description: string, min: number, max: number) => {
  try {
    const { body } = await got.post(
      `${process.env.LNBITS_URL}/lnurlp/api/v1/links`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': process.env.LNURL_API_KEY,
        },
        body: JSON.stringify({
          description,
          max,
          min,
          comment_chars: 140,
        }),
      }
    )

    return JSON.parse(body) as LnUrlPCreatePayLinkResponse
  } catch (error) {
    console.error(error)
    return
  }
}

export default createLnUrlP
