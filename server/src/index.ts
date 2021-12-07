import 'reflect-metadata'
import 'dotenv-safe/config'
import path from 'path'
import express from 'express'
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import { schedule } from 'node-cron'
import {
  AddressResolver,
  BlockResolver,
  FaucetResolver,
  InvoiceResolver,
  NewsResolver,
  PostResolver,
  TopicResolver,
  UserResolver,
} from './resolvers'
import { createConnection } from 'typeorm'
import {
  Block,
  CnbRequest,
  FaucetRequest,
  Invoice,
  NewsItem,
  Post,
  Receiver,
  Topic,
  User,
} from './entities'
import {
  handleCnbRequests,
  handleFaucet,
  handleInvoices,
  handlePosts,
  saveCnbRequests,
  saveBlocks,
  saveNews,
} from './workers'
import { COOKIE_NAME, __prod__ } from './constants'
import { MyContext } from './types/my-context'

const main = async (): Promise<void> => {
  // db
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: process.env.DB_LOGGING === 'true' ? true : false,
    synchronize: process.env.DB_SYNC === 'true' ? true : false,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [
      Block,
      FaucetRequest,
      Invoice,
      Post,
      Receiver,
      Topic,
      NewsItem,
      User,
      CnbRequest,
    ],
  })

  await conn.runMigrations()

  // cron
  // run every 5 minutes
  schedule('*/5 * * * *', () => handleCnbRequests())
  // run every 4 minutes
  schedule('*/4 * * * *', () => saveNews())
  schedule('*/4 * * * *', () => saveCnbRequests())
  // run every 3 minutes
  schedule('*/3 * * * *', () => saveBlocks())
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

  // redis
  const RedisStore = connectRedis(session)
  const redis = new Redis(process.env.REDIS_URL)
  app.set('trust proxy', 1)
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 1, // 1 year
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // true -> cookie only works in https
        domain: __prod__ ? process.env.DOMAIN : undefined,
      },
      saveUninitialized: false, // don't store empty sessions
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  )

  // apollo
  const schema = await buildSchema({
    resolvers: [
      AddressResolver,
      FaucetResolver,
      InvoiceResolver,
      NewsResolver,
      PostResolver,
      TopicResolver,
      UserResolver,
      BlockResolver,
    ],
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
    }),
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
