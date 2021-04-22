import Konva from 'konva'
import { planSet } from './tempData'
import limitedPlanDrawer from './limitedPlanDrawer'
import timeLineConfig from './timeLineConfig'
import timeLimitedPlanConfig from './timeLimitedPlanConfig'

class timeLimitedPlanDrawer extends limitedPlanDrawer {
  static init () {
    this.renderPlans()
  }

  static renderPlans () {
    for (const plan of planSet.timeLimitedPlanSet) {
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
    const node = this.transform(plan, plan.startTime, plan.startType)
    if (node !== null) {
      this.mountNodeEvent(node)
      node.id(plan.id + 'start')
      node.name(plan.id)
      this.located(node, plan.startTime[0])
      this.nodeGroup.add(node)

      return node
    }
    return null
  }

  static renderEndNode (plan) {
    const node = this.transform(plan, plan.endTime, plan.endType)
    if (node !== null) {
      this.mountNodeEvent(node)
      node.id(plan.id + 'end')
      node.name(plan.id)
      this.located(node, plan.endTime[0])
      this.nodeGroup.add(node)

      return node
    }
    return null
  }

  static transform (plan, time, type) {
    switch (time.length) {
      case 0: return null
      case 1: return this.transformToPointNode(plan, time, type)
      case 2: return this.transformToRangeNode(plan, time, type)
    }
  }

  static transformToPointNode (plan, time, type) {
    const node = new Konva.RegularPolygon({
      x: 100,
      y: 100,
      sides: 3,
      radius: timeLimitedPlanConfig.height,
      fill: 'red',
      draggable: true
    })
    this.setRotation(node, type)
    return node
  }

  static transformToRangeNode (plan, time, type) {
    const startTime = time[0].split(':')
    const endTime = time[1].split(':')

    const hour = parseInt(endTime[0]) - parseInt(startTime[0])
    const minute = parseInt(endTime[1]) - parseInt(startTime[1])

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

  static setRotation (node, type) {
    if (type === 0) {
      node.rotation(90)
    } else {
      node.rotation(270)
    }
  }

  static located (node, time) {
    const tmp = time.split(':')
    const hour = parseInt(tmp[0])
    const minute = parseInt(tmp[1])
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

  static updatePosition (node) {

  }
}

export default timeLimitedPlanDrawer
