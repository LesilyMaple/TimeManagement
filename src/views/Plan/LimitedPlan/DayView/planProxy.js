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
  store: null,
  cache: null,
  init (container, store) {
    this.store = store
    this.cache = new Map()
    const containerHeight = document.getElementById(container).offsetHeight
    this.initConfig(containerHeight)
    this.renderTimeLine()
    this.initStage(container, timeLineDrawer.width, containerHeight)
    this.initPlanDrawer()
    this.stage.add(timeLineDrawer.layer, limitedPlanDrawer.layer)
  },
  initConfig (containerHeight) {
    timeLineConfig.init(containerHeight)
    orderLimitedPlanConfig.init(containerHeight)
    timeLimitedPlanConfig.init(containerHeight)
  },
  initStage (container, width, height) {
    this.stage = new Konva.Stage({
      container: container,
      width: width,
      height: height
    })
  },
  initPlanDrawer () {
    this.planLayer = new Konva.Layer()
    limitedPlanDrawer.init(this.stage, this.planLayer)
    limitedPlanDrawer.store = this.store
  },
  renderTimeLine () {
    timeLineDrawer.render()
    this.timeLineLayer = timeLineDrawer.layer
  },
  draw () {
    orderLimitedPlanDrawer.render()
    timeLimitedPlanDrawer.render()
    limitedPlanDrawer.render()
    this.stage.draw()
  },
  reDraw (oldDate, newDate) {
    this.cache.set(oldDate, this.planLayer)
    if (this.cache.has(newDate)) {
      this.planLayer = this.cache.get(newDate)
    } else {
      this.initPlanDrawer()
    }
    this.draw()
  }
}

const planHandleProxy = {
  store: null,
  showAddTimeLimitedPlanPopup: null,
  init (showAddTimeLimitedPlanPopup) {
    this.showAddTimeLimitedPlanPopup = showAddTimeLimitedPlanPopup
    this.store = limitedPlanDrawer.store
  },
  addOrderLimitedPlan (rawPlan) {
    // 1. 判断结点是否合法
    // 2. 合法则向后端发送数据，并返回结点id；不合法则返回reject
    const order = rawPlan.order
    const pos = limitedPlanDrawer.getNeighborNodePos(order)
    const plan = {
      ...rawPlan,
      x: pos.x,
      y: pos.y
    }
    this.store.dispatch('limitedPlanDay/addOrderPlan', plan)
      .then(id => {
        orderLimitedPlanDrawer.addPlan({ id, ...plan })
        const currentNode = limitedPlanDrawer.getSelectedShape()
        let from
        let to
        if (order === 0) {
          from = id
          to = limitedPlanDrawer.getPlanIdByNode(currentNode)
        } else {
          from = limitedPlanDrawer.getPlanIdByNode(currentNode)
          to = id
        }
        console.log(from, to)
        this.store.dispatch('limitedPlanDay/addRelation', { [from]: to })
          .then(_ => {
            limitedPlanDrawer.renderArrowByPlanId(from, to)
          })
      })
  },
  addTimeLimitedPlan (plan) {
    this.store.dispatch('limitedPlanDay/addTimePlan', plan)
      .then(id => {
        timeLimitedPlanDrawer.addPlan({ id, ...plan })
      })
  },
  addRelation (from, to) {
    console.log(from, to)
    const relation = {}
    relation[from] = to
    this.store.dispatch('limitedPlanDay/addRelation', relation)
      .then(_ => {
        limitedPlanDrawer.renderArrowByPlanId(from, to)
      })
  },
  removePlan (id) {
    this.store.dispatch('limitedPlanDay/removePlan', id)
      .then(removedData => {
        orderLimitedPlanDrawer.removePlan(id)
      })
  },
  removeRelation (relation) {
    limitedPlanDrawer.removeRelation(relation)
    this.store.dispatch('limitedPlanDay/removeRelation', relation)
  },
  updateOrderLimitedPlan (plan) {
    orderLimitedPlanDrawer.updatePlan(plan)
    this.store.dispatch('limitedPlanDay/updateOrderPlan', plan)
  },
  updateTimeLimitedPlan (plan) {
    timeLimitedPlanDrawer.updatePlan(plan)
    this.store.dispatch('limitedPlanDay/updateTimePlan', plan)
  },
  updateRelation (relation) {
    limitedPlanDrawer.updateRelation(relation)
    this.store.dispatch('limitedPlanDay/updateRelation', relation)
  },
  updatePosition () {

  }
}

export { planDrawerProxy, planHandleProxy }
