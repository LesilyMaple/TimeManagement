import Konva from 'konva'
import planDetails from '@/store/planDetails'
import orderLimitedPlanConfig from '@/views/Plan/LimitedPlan/DayView/orderLimitedPlanConfig'

class limitedPlanDrawer {
  static stage
  static layer
  static nodeGroup
  static arrowGroup
  static selectedGroup
  static store
  static relation

  static init (stage, layer) {
    this.stage = stage
    this.layer = layer

    this.nodeGroup = new Konva.Group()
    this.arrowGroup = new Konva.Group()
    this.selectedGroup = new Konva.Group()

    this.layer.add(this.arrowGroup, this.nodeGroup, this.selectedGroup)
  }

  static render () {
    this.relation = this.store.state.limitedPlanDay.planRelation
    this.renderArrows()
  }

  static mountNodeEvent (node) {
    this.mountHoverEvent(node)
    this.mountMouseOverEvent(node)
    this.mountNodeClickEvent(node)
    this.mountDropEvent(node)
  }

  static mountHoverEvent (shape) {
    shape.on('mouseover', () => {
      this.stage.container().style.cursor = 'pointer'
    })
    shape.on('mouseleave', () => {
      this.stage.container().style.cursor = 'default'
    })
  }

  static mountMouseOverEvent (node) {
    node.on('mouseover', () => {
      node.fill('#556B2F')
      this.layer.draw()
    })
    node.on('mouseout', () => {
      node.fill('#CD5C5C')
      this.layer.draw()
    })
  }

  static mountNodeClickEvent (node) {
    node.on('click', () => {
      node.fill('#778899')
      if (this.selectedGroup.children.length !== 0) {
        const preNode = this.selectedGroup.children[0]
        preNode.moveTo(this.nodeGroup)
      }
      node.moveTo(this.selectedGroup)
      planDetails.set(this.findPlanByNode(node))
    })
  }

  static mountArrowClickEvent (arrow) {
    arrow.on('click', () => {
      arrow.fill('#778899')
      if (this.selectedGroup.children.length !== 0) {
        const preArrow = this.selectedGroup.children[0]
        preArrow.moveTo(this.arrowGroup)
      }
      arrow.moveTo(this.selectedGroup)
      planDetails.set(this.getArrowDetails(arrow))
    })
  }

  static renderArrows () {
    for (const i in this.relation) {
      const js = this.relation[i]
      for (const j of js) {
        this.renderArrowByPlanId(i, j)
      }
    }
  }

  static renderArrowByPlanId (i, j) {
    // 之所以是layer而不是nodeGroup，是因为可能有结点在selectedGroup里
    let from = this.layer.findOne('#' + i)
    let to = this.layer.findOne('#' + j)
    if (i[0] === 't') {
      const nodes = this.layer.find('.' + i)
      if (nodes.length > 1) {
        from = nodes[1]
      } else {
        from = nodes[0]
      }
    }
    if (j[0] === 't') {
      const nodes = this.layer.find('.' + j)
      if (nodes.length > 1) {
        to = nodes[0]
      } else {
        to = nodes[1]
      }
    }
    this.renderArrowByNode(from, to)
  }

  static renderArrowByNode (from, to) {
    const arrow = new Konva.Arrow({
      id: 'r' + from.id() + '-' + to.id(),
      points: this.getArrowPoints(from, to),
      stroke: '#DA70D6',
      fill: '#DA70D6'
    })

    this.mountDragMoveEvent(from, to, arrow)
    this.mountHoverEvent(arrow)
    this.mountArrowClickEvent(arrow)

    this.arrowGroup.add(arrow)
    this.layer.batchDraw()
  }

  static getArrowPoints (from, to) {
    const dx = to.x() - from.x()
    const dy = to.y() - from.y()
    const angle = Math.atan2(-dy, dx)

    const radius = 20

    return [
      from.x() + -radius * Math.cos(angle + Math.PI),
      from.y() + radius * Math.sin(angle + Math.PI),
      to.x() + -radius * Math.cos(angle),
      to.y() + radius * Math.sin(angle)
    ]
  }

  static mountDragMoveEvent (from, to, arrow) {
    from.on('dragmove', () => {
      arrow.points(this.getArrowPoints(from, to))
    })

    to.on('dragmove', () => {
      arrow.points(this.getArrowPoints(from, to))
    })
  }

  static mountDropEvent (node) {
    node.on('dragend', () => {
      this.updatePosition(node)
    })
  }

  static findPlanByNode (node) {
    let planSet
    let id
    if (node.name() === '') {
      planSet = this.store.state.limitedPlanDay.orderLimitedPlanSet
      id = node.id()
    } else {
      planSet = this.store.state.limitedPlanDay.timeLimitedPlanSet
      id = node.name()
    }

    for (const plan of planSet) {
      if (plan.id === id) return plan
    }
    return null
  }

  static getPlanIdByNode (node) {
    if (node.id()[0] === 't') {
      return node.name()
    } else {
      return node.id()
    }
  }

  static updateRelation (relation) {

  }

  /*
  * 获取当前选中结点前／后一身位的坐标
  */
  static getNeighborNodePos (order) {
    const pos = {
      x: 0,
      y: 0
    }
    const baseNode = this.selectedGroup.children[0]
    if (order === 0) { // 之前
      pos.x = baseNode.x() - orderLimitedPlanConfig.radius * 3
    } else { // 之后
      pos.x = baseNode.x() + orderLimitedPlanConfig.radius * 3
    }
    pos.y = baseNode.y() + orderLimitedPlanConfig.radius * 3
    return pos
  }

  static getSelectedShape () {
    return this.selectedGroup.children[0]
  }

  static getArrowDetails (arrow) {
    const tmp = arrow.id().split('-')
    const fromId = tmp[0].substr(1)
    const toId = tmp[1]
    return {
      id: arrow.id(),
      fromId,
      toId
    }
  }

  static updatePosition (node) {}

  /*
  * 移除结点相关
  */

  static removeRelation (relation) {}
}

export default limitedPlanDrawer
