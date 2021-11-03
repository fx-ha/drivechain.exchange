const getPort = (chain: string) =>
  ({
    drivenet: process.env.DRIVENET_PORT,
    testchain: process.env.TESTCHAIN_PORT,
    thunder: process.env.THUNDER_PORT,
    trainchain: process.env.TRAINCHAIN_PORT,
    zside: process.env.ZSIDE_PORT,
  }[chain])

export default getPort
