declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    PORT: string
    CORS_ORIGIN: string
    DATABASE_URL: string
    DB_LOGGING: string
    DB_SYNC: string
    RPC_URL: string
    DRIVENET_PORT: string
    TESTCHAIN_PORT: string
    THUNDER_PORT: string
    TRAINCHAIN_PORT: string
    ZSIDE_PORT: string
    MIN_CONF: string
    SESSION_SECRET: string
    REDIS_URL: string
    DOMAIN: string
    LNBITS_URL: string
    LNBITS_API_KEY: string
    LNURL_API_KEY: string
    TWITTER_CONSUMER_KEY: string
    TWITTER_CONSUMER_SECRET: string
    TWITTER_OAUTH_TOKEN: string
    TWITTER_OAUTH_TOKEN_SECRET: string
  }
}
