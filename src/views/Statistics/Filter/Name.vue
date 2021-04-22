<template>
  <Base>
    <slot>
      <el-input
        size="mini"
        v-model="data.name"
        placeholder="任务名（正则表达式）"
      />
    </slot>
  </Base>
</template>

<script>
import Base from './Base'
import { inject } from 'vue'

export default {
  name: 'NameFilter',
  components: {
    Base
  },
  setup () {
    return {
      data: inject('data')
    }
  }
}
</script>

<style scoped>

</style>
