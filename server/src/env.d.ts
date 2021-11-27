declare namespace NodeJS {
  interface ProcessEnv {
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
  }
}
