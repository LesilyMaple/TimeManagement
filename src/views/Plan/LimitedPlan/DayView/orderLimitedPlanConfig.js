const orderLimitedPlanConfig = {
  backgroundHeight: 0,
  init (backgroundHeight) {
    this.backgroundHeight = backgroundHeight
  },
  radiusRate: 0.02,
  fill: '#B22222',
  stroke: 'white',
  strokeWidth: 2,

  get radius () {
    return this.radiusRate * this.backgroundHeight
  }
}

export default orderLimitedPlanConfig
