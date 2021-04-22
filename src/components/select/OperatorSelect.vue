<template>
  <el-select
    v-model="data"
    size="mini"
  >
    <el-option
      v-for="item in operator"
      :key="item"
      :value="item"
    />
  </el-select>
</template>

<script>
import { twoWayBinding } from '@/utils'
import { OPERATOR } from '@/interface/enum'

export default {
  name: 'OperatorButton',
  props: {
    modelValue: {
      type: String,
      default: OPERATOR.EQ
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    return {
      data: twoWayBinding(props, ctx),
      operator: OPERATOR
    }
  }
}
</script>

<style scoped>

</style>
