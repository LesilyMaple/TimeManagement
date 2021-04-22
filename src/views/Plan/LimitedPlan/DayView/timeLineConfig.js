import orderLimitedPlanConfig from './orderLimitedPlanConfig'

const timeLineConfig = {
  backgroundHeight: 0,
  init (backgroundHeight) {
    this.backgroundHeight = backgroundHeight
    orderLimitedPlanConfig.init(backgroundHeight)
  },

  yRate: 0.5,

  block: {
    heightRate: orderLimitedPlanConfig.radiusRate * 3,
    widthRate: orderLimitedPlanConfig.radiusRate * 18,
    stroke: '#77778899',
    strokeWidth: 2,

    get height () {
      return this.heightRate * timeLineConfig.backgroundHeight
    },
    get width () {
      return this.widthRate * timeLineConfig.backgroundHeight
    }
  },
  font: {
    sizeRate: 1,
    family: 'Calibri',
    color: '#77778899',

    get size () {
      return this.sizeRate * timeLineConfig.block.height
    }
  },

  get y () {
    return this.yRate * this.backgroundHeight
  }
}

export default timeLineConfig
