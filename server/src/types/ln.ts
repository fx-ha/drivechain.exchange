export type LnUrlPCreatePayLinkResponse = {
  comment_chars: number
  currency: string | null
  description: string
  id: number
  lnurl: string
  max: number
  min: number
  served_meta: number
  served_pr: number
  success_text: string | null
  success_url: string | null
  wallet: string
  webhook_url: string | null
}

export type LnCreateInvoiceResponse = {
  checking_id: string
  lnurl_response: string | null
  payment_hash: string
  payment_request: string
}

export type LnCheckInvoiceResponse = {
  paid: boolean
  preimage: string
}
