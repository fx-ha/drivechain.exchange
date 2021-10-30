import 'reflect-metadata'
import 'dotenv-safe/config.js'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import nodeCron from 'node-cron'
import { HelloResolver } from './resolvers'
import { createConnection } from 'typeorm'
import { Block, NewsItem } from './entities'
import { saveBlocks } from './workers'

const { schedule } = nodeCron

const main = async (): Promise<void> => {
  // db
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: process.env.DB_LOGGING === 'true' ? true : false,
    synchronize: process.env.DB_SYNC === 'true' ? true : false,
    entities: [Block, NewsItem],
  })

  // cron
  // every 30 minutes
  schedule('*/30 * * * *', () => saveBlocks())

  // express
  const app = express()

  app.get('/', (_, res) => {
    res.send('Hello World!')
  })

  // cors
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

  // apollo
  const schema = await buildSchema({
    resolvers: [HelloResolver],
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
