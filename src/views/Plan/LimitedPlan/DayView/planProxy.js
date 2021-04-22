import Konva from 'konva'
import timeLineConfig from './timeLineConfig'
import orderLimitedPlanConfig from './orderLimitedPlanConfig'
import timeLimitedPlanConfig from './timeLimitedPlanConfig'
import timeLineDrawer from './timeLineDrawer'
import limitedPlanDrawer from './limitedPlanDrawer'
import orderLimitedPlanDrawer from './orderLimitedPlanDrawer'
import timeLimitedPlanDrawer from './timeLimitedPlanDrawer'

const planDrawerProxy = {
  stage: null,
  timeLineLayer: null,
  planLayer: null,
  init (container) {
    const bodyHeight = document.body.offsetHeight
    timeLineConfig.init(bodyHeight)
    orderLimitedPlanConfig.init(bodyHeight)
    timeLimitedPlanConfig.init(bodyHeight)

    timeLineDrawer.init()

    this.stage = this.createStage(container, timeLineDrawer.width, bodyHeight)
    this.timeLineLayer = timeLineDrawer.layer
    this.planLayer = new Konva.Layer()

    limitedPlanDrawer.init(this.stage, this.planLayer)
    orderLimitedPlanDrawer.init()
    timeLimitedPlanDrawer.init()
    limitedPlanDrawer.renderArrows()

    this.stage.add(timeLineDrawer.layer, limitedPlanDrawer.layer)
    this.stage.draw()
  },
  createStage (container, width, height) {
    return new Konva.Stage({
      container: container,
      width: width,
      height: height
    })
  }
}

const planHandleProxy = {
  addOrderLimitedPlan (plan, baseId) {
    // 1. 判断结点是否合法
    // 2. 合法则向后端发送数据，并返回结点id；不合法则返回reject
    orderLimitedPlanDrawer.addNode(plan, baseId)
  },
  addTimeLimitedPlan () {

  },
  deleteOrderLimitedPlan () {

  },
  deleteTimeLimitedPlan () {

  },
  updateOrderLimitedPlan () {

  },
  updateTimeLimitedPlan () {

  }
}

export { planDrawerProxy, planHandleProxy }
