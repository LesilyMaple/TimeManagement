import Konva from 'konva'
import planDetails from '@/store/planDetails'
import { useStore } from 'vuex'

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

    this.store = useStore()
    this.relation = this.store.state.limitedPlanDay.planRelation
  }

  static mountNodeEvent (node) {
    this.mountHoverEvent(node)
    this.mountMouseOverEvent(node)
    this.mountClickEvent(node)
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

  static mountClickEvent (node) {
    node.on('click', () => {
      node.fill('#778899')
      node.moveTo(this.selectedGroup)
      planDetails.set(this.findPlanByNode(node))
    })
  }

  static renderArrows () {
    for (const i in this.relation) {
      const js = this.relation[i]
      for (const j of js) {
        let from = this.nodeGroup.findOne('#' + i)
        let to = this.nodeGroup.findOne('#' + j)
        if (i[0] === 't') {
          const nodes = this.nodeGroup.find('.' + i)
          from = nodes[0]
          if (nodes.length > 1) {
            from = nodes[1]
          }
        }
        if (j[0] === 't') {
          to = this.nodeGroup.find('.' + j)[0]
        }
        this.renderArrow(from, to)
      }
    }
  }

  static renderArrow (from, to) {
    const arrow = new Konva.Arrow({
      points: this.getArrowPoints(from, to),
      stroke: '#DA70D6',
      fill: '#DA70D6'
    })

    this.mountDragMoveEvent(from, to, arrow)
    this.mountHoverEvent(arrow)

    this.arrowGroup.add(arrow)
    // this.layer.batchDraw()
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

  static updatePosition (node) {}
}

export default limitedPlanDrawer
