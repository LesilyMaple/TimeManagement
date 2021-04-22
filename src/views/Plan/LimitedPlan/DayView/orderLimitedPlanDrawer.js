import limitedPlanDrawer from './limitedPlanDrawer'
import Konva from 'konva'

class orderLimitedPlanDrawer extends limitedPlanDrawer {
  static planSet

  static init () {
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
  }

  static renderNode (plan) {
    const node = this.transform(plan)
    this.mountNodeEvent(node)
    this.located(node, plan.pos.x, plan.pos.y)
    this.setBound(node)
    return node
  }

  static transform (plan) {
    return new Konva.Circle({
      id: plan.id,
      radius: 20,
      fill: '#CD5C5C',
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

  static async addNode (plan, baseId) {
    // const id = await this.store.dispatch('limitedPlanDay/add')
    // const node =
  }

  static deleteNode () {

  }

  static updateNode () {

  }

  static updatePosition (node) {
    const plan = this.findPlanByNode(node)
    this.store.dispatch('limitedPlanDay/updatePosition', {
      plan: plan,
      x: node.x(),
      y: node.y()
    })
  }
}

export default orderLimitedPlanDrawer
