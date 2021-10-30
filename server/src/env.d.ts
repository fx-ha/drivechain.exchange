declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
    CORS_ORIGIN: string
    DATABASE_URL: string
    DB_LOGGING: string
    DB_SYNC: string
    RPC_URL: string
  }
}
