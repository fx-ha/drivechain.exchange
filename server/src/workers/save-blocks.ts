import got from 'got'
import { getConnection } from 'typeorm'
import {
  GetBlockCountResponse,
  GetBlockHashResponse,
  GetBlockResponse,
} from '../types'
import { Block } from '../entities'

const URL = process.env.RPC_URL

// TODO needs refactoring

const saveBlocks = async (): Promise<void> => {
  // TODO refactor post requests, they're all the same
  const { body: countBody } = await got.post(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'getblockcount',
      params: [],
    }),
  })

  const blockCount: GetBlockCountResponse = JSON.parse(countBody).result

  if (blockCount === undefined) {
    console.error('can not connect to rpc server')

    return
  }

  let highestBlock = await Block.findOne({ order: { height: 'DESC' } })

  // save genesis block if no blocks exist in db
  if (highestBlock === undefined) {
    const { body: genesisHashBody } = await got.post(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '1.0',
        id: 'curltext',
        method: 'getblockhash',
        params: [0],
      }),
    })

    const genesisHash: GetBlockHashResponse = JSON.parse(genesisHashBody).result

    if (genesisHash === undefined) {
      console.error('can not get genesis hash')

      return
    }

    const { body: genesisBlockBody } = await got.post(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '1.0',
        id: 'curltext',
        method: 'getblock',
        params: [genesisHash],
      }),
    })

    const genesisBlock: GetBlockResponse = JSON.parse(genesisBlockBody).result

    if (genesisBlock === undefined) {
      console.error('can not get data for genesis block')

      return
    }

    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Block)
      .values({
        hash: genesisBlock.hash,
        height: genesisBlock.height,
        createdAt: new Date(genesisBlock.time * 1000),
      })
      .returning('*')
      .execute()

    highestBlock = result.raw[0]
  }

  if (highestBlock === undefined) {
    console.error('can not save genesis block to database')

    return
  }

  if (highestBlock.height === blockCount) {
    console.log('no new blocks')

    return
  }

  const { body } = await got.post(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'getblock',
      params: [highestBlock.hash],
    }),
  })

  const result: GetBlockResponse = JSON.parse(body).result

  if (result === undefined) {
    console.error('can not get rpc data for last saved block')

    return
  }

  let nextblockhash = result.nextblockhash

  for (let i = highestBlock.height; i < blockCount; i++) {
    const { body } = await got.post(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '1.0',
        id: 'curltext',
        method: 'getblock',
        params: [nextblockhash],
      }),
    })

    const block: GetBlockResponse = JSON.parse(body).result

    if (block === undefined) {
      console.error(`can not get data block with hash ${nextblockhash}`)

      return
    }

    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Block)
      .values({
        hash: block.hash,
        height: block.height,
        createdAt: new Date(block.time * 1000),
      })
      .returning('*')
      .execute()

    const savedBlock = result.raw[0]

    if (savedBlock === undefined) {
      console.error(`can not save block with hash ${nextblockhash} to db`)
      return
    }

    nextblockhash = block.nextblockhash
  }
}

export default saveBlocks
