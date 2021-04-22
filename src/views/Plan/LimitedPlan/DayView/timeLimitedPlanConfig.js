import orderLimitedPlanConfig from './orderLimitedPlanConfig'

const timeLimitedPlanConfig = {
  backgroundHeight: 0,
  init (backgroundHeight) {
    this.backgroundHeight = backgroundHeight
  },
  heightRate: orderLimitedPlanConfig.radiusRate,
  color: 'red',

  get height () {
    return this.heightRate * this.backgroundHeight
  }
}

export default timeLimitedPlanConfig
