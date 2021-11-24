import 'reflect-metadata'
import 'dotenv-safe/config'
import path from 'path'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import { schedule } from 'node-cron'
import {
  AddressResolver,
  FaucetResolver,
  InvoiceResolver,
  NewsResolver,
  PostResolver,
  TopicResolver,
} from './resolvers'
import { createConnection } from 'typeorm'
import {
  Block,
  FaucetRequest,
  Invoice,
  NewsItem,
  Post,
  Receiver,
  Topic,
} from './entities'
import {
  handleFaucet,
  handleInvoices,
  handlePosts,
  saveBlocks,
  saveNews,
} from './workers'

const main = async (): Promise<void> => {
  // db
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: process.env.DB_LOGGING === 'true' ? true : false,
    synchronize: process.env.DB_SYNC === 'true' ? true : false,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Block, FaucetRequest, Invoice, Post, Receiver, Topic, NewsItem],
  })

  await conn.runMigrations()

  // cron
  // run every 10 minutes from :00
  schedule('0,10,20,30,40,50 * * * *', () => saveBlocks())
  // run every 10 minutes from :05
  schedule('5,15,25,35,45,55 * * * *', () => saveNews())
  // run every minute
  schedule('*/1 * * * *', () => handleInvoices())
  schedule('*/1 * * * *', () => handlePosts())
  schedule('*/1 * * * *', () => handleFaucet())

  // express
  const app = express()

  app.get('/', (_, res) => {
    res.send('Hello World!')
  })

  // cors
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

  // apollo
  const schema = await buildSchema({
    resolvers: [
      AddressResolver,
      FaucetResolver,
      InvoiceResolver,
      NewsResolver,
      PostResolver,
      TopicResolver,
    ],
  })

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, cors: false })

  // listen on port
  app.listen(parseInt(process.env.PORT), () => {
    console.log(`server started on localhost:${process.env.PORT}`)
  })
}

main().catch((error) => {
  console.error(error)
})
