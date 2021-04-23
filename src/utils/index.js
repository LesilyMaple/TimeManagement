import { computed } from 'vue'
import { ORDER } from '@/interface/enum'

export function getStateRef (obj, key) {
  return computed({
    get: () => obj[key],
    set: v => {
      obj[key] = v
    }
  })
}

/*
* 父子组件双向绑定
* 注：只适用于父子组件、多层嵌套组件没有效果
*/
export function twoWayBinding (props, ctx) {
  return computed({
    get () {
      return props.modelValue
    },
    set (val) {
      ctx.emit('update:modelValue', val)
    }
  })
}

export function getOrderOptions () {
  return [{
    value: ORDER.BEFORE,
    label: '之前'
  }, {
    value: ORDER.AFTER,
    label: '之后'
  }]
}
