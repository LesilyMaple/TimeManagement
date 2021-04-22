<template>
  <Base>
    <slot>
      <NotSelect v-model="data.notDate" />
      <DateSelect />
      <NotSelect v-model="data.notTime" />
      <TimeSelect />
    </slot>
  </Base>
</template>

<script>
import Base from './Base'
import NotSelect from '@/components/select/NotSelect'
import DateSelect from '@/components/select/time/DateSelect'
import TimeSelect from '@/components/select/time/TimeSelect'
import { inject } from 'vue'
export default {
  name: 'TimeFilter',
  components: {
    Base,
    NotSelect,
    DateSelect,
    TimeSelect
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
