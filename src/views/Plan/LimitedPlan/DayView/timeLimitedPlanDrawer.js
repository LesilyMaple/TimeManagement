import Konva from 'konva'
import limitedPlanDrawer from './limitedPlanDrawer'
import timeLineConfig from './timeLineConfig'
import timeLimitedPlanConfig from './timeLimitedPlanConfig'

class timeLimitedPlanDrawer extends limitedPlanDrawer {
  static planSet

  static render () {
    this.planSet = this.store.state.dateTimePlan.timeLimitedPlanSet
    this.renderPlans()
  }

  static renderPlans () {
    for (const plan of this.planSet) {
      this.renderPlan(plan)
    }
  }

  static renderPlan (plan) {
    const startNode = this.renderStartNode(plan)
    const endNode = this.renderEndNode(plan)
    if (startNode && endNode) {
      this.setRelation(startNode, endNode)
    }
  }

  static renderStartNode (plan) {
    const node = this.transform(plan, plan.startTime)
    if (node !== null) {
      this.mountNodeEvent(node)
      node.id(plan.id + 'start')
      node.name(plan.id)
      this.located(node, plan.startTime)
      this.nodeGroup.add(node)

      return node
    }
    return null
  }

  static renderEndNode (plan) {
    const node = this.transform(plan, plan.endTime)
    if (node !== null) {
      this.mountNodeEvent(node)
      node.id(plan.id + 'end')
      node.name(plan.id)
      this.located(node, plan.endTime)
      this.nodeGroup.add(node)

      return node
    }
    return null
  }

  static transform (plan, time) {
    if (!time[0] && !time[1]) {
      return null
    } else if (time[0] && time[1]) {
      return this.transformToRangeNode(plan, time)
    } else {
      return this.transformToPointNode(plan, time)
    }
  }

  static transformToPointNode (plan, time) {
    const order = time[0] ? 0 : 1
    const node = new Konva.RegularPolygon({
      x: 100,
      y: 100,
      sides: 3,
      radius: timeLimitedPlanConfig.height,
      fill: 'red',
      draggable: true
    })
    this.setRotation(node, order)
    return node
  }

  static transformToRangeNode (plan, time) {
    const startTime = time[0]
    const endTime = time[1]

    const hour = endTime.getHours() - startTime.getHours()
    const minute = endTime.getMinutes() - startTime.getMinutes()

    const width = (hour + minute / 60) * timeLineConfig.block.width
    const height = timeLimitedPlanConfig.height * 1.732

    const node = new Konva.Rect({
      width: width,
      height: height,
      fill: timeLimitedPlanConfig.color,
      draggable: true
    })
    return node
  }

  static setRotation (node, order) {
    if (order === 0) {
      node.rotation(90)
    } else {
      node.rotation(270)
    }
  }

  static located (node, time) {
    time = time[0] ? time[0] : time[1]
    const hour = time.getHours()
    const minute = time.getMinutes()
    const x = (hour + minute / 60) * timeLineConfig.block.width
    let y = timeLineConfig.y
    if (node.getClassName() === 'Rect') {
      y -= node.height() / 2
    }
    node.x(x)
    node.y(y)
  }

  static setRelation (from, to) {
    const arrow = new Konva.Arrow({
      points: this.getArrowPoints(from, to),
      stroke: '#DA70D6',
      fill: '#DA70D6'
    })
    this.mountDragMoveEvent(from, to, arrow)
    this.mountHoverEvent(arrow)
    this.arrowGroup.add(arrow)
  }

  static getArrowPoints (from, to) {
    let y = from.y()
    if (from.getClassName() === 'Rect') {
      y += from.height() / 2
    }
    let x1 = from.x() + from.width() / 2 - 2 // -2是为了看起来更好，不减的话图形和线中间可能会有空隙
    if (from.getClassName() === 'Rect') {
      x1 += from.width() / 2
    }
    let x2 = to.x()
    if (to.getClassName() === 'RegularPolygon') {
      x2 -= to.radius()
    }

    return [x1, y, x2, y]
  }

  /*
  * 添加相关
  */

  static addPlan (rawPlan, id) {
    this.renderPlan({ id, ...rawPlan })
  }

  /*
  * 移除相关
  */

  static removePlan (id) {
  }

  /*
  * 更新相关
  */

  static updatePlan (plan) {
    console.log(plan)
  }

  static updatePosition (node) {

  }
}

export default timeLimitedPlanDrawer
