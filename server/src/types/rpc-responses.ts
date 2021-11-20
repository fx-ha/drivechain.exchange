export type GetBlockResponse = {
  hash: string
  confirmations: number
  strippedsize: number
  size: number
  weight: number
  height: number
  version: number
  versionHex: string
  merkleroot: string
  tx: string[]
  time: number
  mediantime: number
  nonce: number
  bits: string
  difficulty: number
  chainwork: string
  nextblockhash: string
}

export type GetBlockCountResponse = number

export type GetBlockHashResponse = string

export type GetOpReturnDataResponse = {
  txid: string
  script: string
  size: number
  fees: string
  hex: string
  decode: string
}[]

export type GetRawTransactionResponse = {
  txid: string
  hash: string
  version: number
  size: number
  vsize: number
  locktime: number
  vin: {
    txid: string
    vout: number
    scriptSig: { asm: string; hex: string }[]
    txinwitness?: []
    sequence: number
  }[]
  vout: {
    value: number
    n: number
    scriptPubKey: {
      asm: string
      hex: string
      reqSigs: number
      type: string
      addresses: []
    }
  }[]
  hex: string
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
}

export type GetListUnspentResponse = {
  txid: string
  vout: number
  address: string
  account?: string
  redeemScript?: string
  scriptPubKey: string
  amount: number
  confirmations: number
  spendable: boolean
  solvable: boolean
  safe: boolean
}[]
