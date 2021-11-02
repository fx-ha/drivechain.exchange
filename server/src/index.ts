import 'reflect-metadata'
import 'dotenv-safe/config.js'
import path from 'path'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import { schedule } from 'node-cron'
import { NewsResolver, TopicResolver } from './resolvers'
import { createConnection } from 'typeorm'
import { Block, NewsItem, Topic } from './entities'
import { saveBlocks, saveNews } from './workers'

const main = async (): Promise<void> => {
  // db
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: process.env.DB_LOGGING === 'true' ? true : false,
    synchronize: process.env.DB_SYNC === 'true' ? true : false,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Block, Topic, NewsItem],
  })

  await conn.runMigrations()

  // cron
  // at x:00 and x:30
  schedule('0,30 * * * *', () => saveBlocks())
  // at x:15 and x:45
  schedule('15,45 * * * *', () => saveNews())

  // express
  const app = express()

  app.get('/', (_, res) => {
    res.send('Hello World!')
  })

  // cors
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

  // apollo
  const schema = await buildSchema({
    resolvers: [NewsResolver, TopicResolver],
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
