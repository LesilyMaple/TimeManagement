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

  static clearShape () {
    this.nodeGroup.destroyChildren()
    this.arrowGroup.destroyChildren()
    this.selectedGroup.destroyChildren()
  }

  static render () {
    this.relation = this.store.state.dateTimePlan.planRelation
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
    // ????????????layer?????????nodeGroup??????????????????????????????selectedGroup???
    let from = this.layer.findOne('#' + i)
    let to = this.layer.findOne('#' + j)
    if (i[0] === 't') {
      const nodes = this.layer.find('.' + i)
      from = nodes[0]
      if (nodes.length > 1 && !this.isStartNodeName(from.id())) {
        from = nodes[1]
      }
    }
    if (j[0] === 't') {
      const nodes = this.layer.find('.' + j)
      to = nodes[0]
      if (nodes.length > 1 && this.isStartNodeName(to.id())) {
        to = nodes[1]
      }
    }
    this.renderArrowByNode(from, to)
  }

  static renderArrowByNode (from, to) {
    const arrow = new Konva.Arrow({
      id: 'r' + from.id().replace(/end/, '') + '-' + to.id().replace(/start/, ''),
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
      planSet = this.store.state.dateTimePlan.orderLimitedPlanSet
      id = node.id()
    } else {
      planSet = this.store.state.dateTimePlan.timeLimitedPlanSet
      id = node.name()
    }

    for (const plan of planSet) {
      if (plan.id === id) return plan
    }
    return null
  }

  static getPlanIdByNodeId (id) {
    return /^.*[0-9]+/.exec(id)[0]
  }

  static isStartNodeName (name) {
    return /end$/.test(name)
  }

  static hasRelation (from, to) {
    return !!this.layer.findOne('#r' + from + '-' + to)
  }

  static updateRelation (relation) {

  }

  /*
  * ???????????????????????????????????????????????????
  */
  static getNeighborNodePos (order) {
    const pos = {
      x: 0,
      y: 0
    }
    const baseNode = this.selectedGroup.children[0]
    if (order === 0) { // ??????
      pos.x = baseNode.x() - orderLimitedPlanConfig.radius * 3
    } else { // ??????
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
  * ??????????????????
  */

  static removeRelation (id) {
    this.layer.findOne('#' + id).destroy()
    this.stage.batchDraw()
  }
}

export default limitedPlanDrawer
