import Konva from 'konva'
import timeLineConfig from './timeLineConfig'

const timeLineDrawer = {
  layer: null,
  width: 0, // 不能直接用layer的宽度设置stage的宽度，layer的宽度貌似是根据stage的宽度确定的，所以要手动提供一个layer的宽度
  init () {
    this.layer = this.createTimeLine()
    this.addTimeBlocks()
    this.width = 24 * timeLineConfig.block.width
  },
  createTimeLine () {
    return new Konva.Layer({
      x: 0,
      y: timeLineConfig.y - timeLineConfig.block.height / 2
    })
  },
  addTimeBlocks () {
    for (let i = 0; i < 24; i++) {
      this.layer.add(this.createTimeBlock(i))
    }
  },
  createTimeBlock (i) {
    const group = new Konva.Group({
      x: i * timeLineConfig.block.width,
      y: 0,
      width: timeLineConfig.block.width,
      height: timeLineConfig.block.height
    })
    group.add(this.createTimeBorder(), this.createTimeText(i))
    return group
  },
  createTimeBorder () {
    return new Konva.Rect({
      x: 0,
      y: 0,
      width: timeLineConfig.block.width,
      height: timeLineConfig.block.height,
      stroke: timeLineConfig.block.stroke,
      strokeWidth: timeLineConfig.block.strokeWidth
    })
  },
  createTimeText (i) {
    const text = new Konva.Text({
      text: `${i}`,
      fontSize: timeLineConfig.font.size,
      fill: timeLineConfig.font.color,
      fontFamily: timeLineConfig.font.family
    })
    text.x(timeLineConfig.block.width / 2 - text.width() / 2)
    text.y(timeLineConfig.block.height / 2 - text.height() / 2)
    return text
  }
}

export default timeLineDrawer
