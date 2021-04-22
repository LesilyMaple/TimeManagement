<template>
  <Base>
    <slot>
      <OperatorSelect v-model="data.operator" />
      <el-select
        v-model="data.rate"
        placeholder="评分"
        size="mini"
      >
        <el-option
          v-for="item in [0,1,2,3,4,5]"
          :key="item"
          :value="item"
        />
      </el-select>
    </slot>
  </Base>
</template>

<script>
import Base from './Base'
import OperatorSelect from '@/components/select/OperatorSelect'
import { inject } from 'vue'

export default {
  name: 'RateFilter',
  components: {
    Base,
    OperatorSelect
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
