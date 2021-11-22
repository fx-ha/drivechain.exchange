import { SERVICE_FEE } from '../constants'

const subtractServiceFee = (amount: number, chainRiskFee = 0): number => {
  // TODO find better method for rounding
  // TODO make sure multiplier is between 0 and 1
  return Number(
    (amount * (1 - SERVICE_FEE - chainRiskFee)).toLocaleString('en-US', {
      maximumFractionDigits: 8,
    })
  )
}

export default subtractServiceFee
