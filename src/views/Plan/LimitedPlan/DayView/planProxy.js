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
    this.cache.set(oldDate, this.planLayer.children)
    limitedPlanDrawer.clearShape()
    this.stage.batchDraw()
    if (this.cache.has(newDate)) {
      this.planLayer.children = this.cache.get(newDate)
      this.stage.batchDraw()
    } else {
      this.draw()
    }
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
    this.store.dispatch('dateTimePlan/addOrderPlan', plan)
      .then(id => {
        orderLimitedPlanDrawer.addPlan({ id, ...plan })
        const currentNode = limitedPlanDrawer.getSelectedShape()
        let from
        let to
        if (order === 0) {
          from = id
          to = limitedPlanDrawer.getPlanIdByNodeId(currentNode.id())
        } else {
          from = limitedPlanDrawer.getPlanIdByNodeId(currentNode.id())
          to = id
        }
        this.store.dispatch('dateTimePlan/addRelation', { [from]: to })
          .then(_ => {
            limitedPlanDrawer.renderArrowByPlanId(from, to)
          })
      })
  },
  addTimeLimitedPlan (plan) {
    this.store.dispatch('dateTimePlan/addTimePlan', plan)
      .then(id => {
        timeLimitedPlanDrawer.addPlan(plan, id)
        limitedPlanDrawer.stage.batchDraw()
      })
  },
  addRelation (from, to) {
    const relation = {}
    relation[from] = to
    this.store.dispatch('dateTimePlan/addRelation', relation)
      .then(_ => {
        limitedPlanDrawer.renderArrowByPlanId(from, to)
      })
  },
  removePlan (id) {
    this.store.dispatch('dateTimePlan/removePlan', id)
      .then(removedData => {
        removedData.relations.forEach(id => {
          limitedPlanDrawer.removeRelation(id)
        })
        if (id[0] === 't') {
          timeLimitedPlanDrawer.removePlan(id)
        } else {
          orderLimitedPlanDrawer.removePlan(id)
        }
        removedData.plans.forEach(id => {
          orderLimitedPlanDrawer.removeNode(id)
        })
      })
  },
  removeRelation (relation) {
    limitedPlanDrawer.removeRelation(relation)
    this.store.dispatch('dateTimePlan/removeRelation', relation)
  },
  updateOrderLimitedPlan (plan) {
    this.store.dispatch('dateTimePlan/updateOrderPlan', plan)
      .then(_ => {
        orderLimitedPlanDrawer.updatePlan(plan)
      })
  },
  updateTimeLimitedPlan (plan) {
    this.store.dispatch('dateTimePlan/updateTimePlan', plan)
      .then(_ => {
        timeLimitedPlanDrawer.updatePlan(plan)
      })
  },
  updateRelation (relation) {
    limitedPlanDrawer.updateRelation(relation)
    this.store.dispatch('dateTimePlan/updateRelation', relation)
  },
  updatePosition (id, x, y) {
    this.store.dispatch('dateTimePlan/updatePosition', { id, x, y })
  }
}

export { planDrawerProxy, planHandleProxy }
