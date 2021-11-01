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

export type GetOpReturnDataResponse =
  | {
      txid: string
      script: string
      size: number
      fees: string
      decode: string
    }[]
  | undefined

export type GetRawTransactionResponse =
  | {
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
  | undefined
