<template>
  <div>
    <el-cascader
      :options="options.value"
      :props="{ checkStrictly: true }"
      clearable
      size="mini"
    />
  </div>
</template>

<script>
import { twoWayBinding } from '@/utils'
import { useStore } from 'vuex'

export default {
  name: 'TaskType',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const store = useStore()
    const options = store.state.taskType.options
    return {
      options,
      data: twoWayBinding(props, ctx)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
