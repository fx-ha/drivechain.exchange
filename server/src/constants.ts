export const RPC_URL = process.env.RPC_URL
export const DRIVENET_PORT = process.env.DRIVENET_PORT
export const NEWS_MIN_START_HEIGHT = 2700
export const MIN_CONF = parseInt(process.env.MIN_CONF)
export const SERVICE_FEE = 0.01 // 1 %
export const MIN_COIN_NEWS_FEE = 0.0002
export const MAX_COIN_NEWS_FEE = 1.0
export const MIN_EXCHANGE_AMOUNT = 0.1
export const MAX_EXCHANGE_AMOUNT = 1.0
export const MAX_FAUCET_REQUEST = 0.2
export const COOKIE_NAME = 'qid'
export const __prod__ = process.env.NODE_ENV === 'production'
