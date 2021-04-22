<template>
  <el-check-tag
    @change="onChange"
    :checked="data"
  >
    not
  </el-check-tag>
</template>

<script>
import { twoWayBinding } from '@/utils'

export default {
  name: 'NotButton',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const data = twoWayBinding(props, ctx)
    const onChange = () => {
      data.value = !data.value
    }

    return {
      data,
      onChange
    }
  }
}
</script>

<style scoped>

</style>
