export type GetBlockResponse =
  | {
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
  | undefined

export type GetBlockCountResponse = number | undefined

export type GetBlockHashResponse = string | undefined
