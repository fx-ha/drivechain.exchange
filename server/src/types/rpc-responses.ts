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
