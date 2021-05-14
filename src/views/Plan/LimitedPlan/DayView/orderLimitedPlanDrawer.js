import Konva from 'konva'
import limitedPlanDrawer from './limitedPlanDrawer'
import orderLimitedPlanConfig from './orderLimitedPlanConfig'
import { planHandleProxy } from '@/views/Plan/LimitedPlan/DayView/planProxy'

class orderLimitedPlanDrawer extends limitedPlanDrawer {
  static planSet

  static render () {
    this.planSet = this.store.state.dateTimePlan.orderLimitedPlanSet
    this.renderPlans()
  }

  static renderPlans () {
    for (const plan of this.planSet) {
      this.renderPlan(plan)
    }
  }

  static renderPlan (plan) {
    const node = this.renderNode(plan)
    this.nodeGroup.add(node)
    return node
  }

  static renderNode (plan) {
    const node = this.transform(plan)
    this.mountNodeEvent(node)
    this.located(node, plan.x, plan.y)
    this.setBound(node)
    return node
  }

  static transform (plan) {
    return new Konva.Circle({
      id: plan.id,
      radius: orderLimitedPlanConfig.radius,
      fill: orderLimitedPlanConfig.fill,
      draggable: true
    })
  }

  static located (node, x, y) {
    node.x(x)
    node.y(y)
  }

  static setBound (node) {
    node.dragBoundFunc(pos => {
      const leftBound = node.radius()
      const rightBound = this.stage.width() - node.radius()
      const topBound = node.radius()
      const bottomBound = this.stage.height() - node.radius()
      let x = pos.x >= leftBound ? pos.x : leftBound
      x = x <= rightBound ? x : rightBound
      let y = pos.y >= topBound ? pos.y : topBound
      y = y <= bottomBound ? y : bottomBound
      return { x, y }
    })
  }

  static findNodeByPlanId (id) {
    return this.nodeGroup.findOne('#' + id)
  }

  static addPlan (plan) {
    this.renderPlan(plan)
    this.stage.batchDraw()
  }

  static removePlan (id) {
    this.layer.findOne('#' + id).destroy()
    this.stage.batchDraw()
  }

  static updatePosition (node) {
    const planId = this.getPlanIdByNodeId(node.id())
    planHandleProxy.updatePosition(planId, node.x(), node.y())
  }
}

export default orderLimitedPlanDrawer
