import Konva from 'konva'
import limitedPlanDrawer from './limitedPlanDrawer'
import orderLimitedPlanConfig from './orderLimitedPlanConfig'

class orderLimitedPlanDrawer extends limitedPlanDrawer {
  static planSet

  static render () {
    this.planSet = this.store.state.limitedPlanDay.orderLimitedPlanSet
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
  }

  static removePlan (id) {

  }

  static updatePlan (plan) {

  }

  static updatePosition (node) {
    // const plan = this.findPlanByNode(node)
    // this.store.dispatch('limitedPlanDay/updatePosition', {
    //   plan: plan,
    //   x: node.x(),
    //   y: node.y()
    // })
  }
}

export default orderLimitedPlanDrawer
