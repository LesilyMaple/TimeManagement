<template>
  <Base>
    <slot>
      <NotSelect v-model="data.not" />
      <TaskType v-model="data.type" />
    </slot>
  </Base>
</template>

<script>
import Base from './Base'
import NotSelect from '@/components/select/NotSelect'
import TaskType from '@/components/TaskType'
import { inject } from 'vue'

export default {
  name: 'TypeFilter',
  components: {
    Base,
    NotSelect,
    TaskType
  },
  setup () {
    const data = inject('data')
    return {
      data
    }
  }
}
</script>

<style scoped>

</style>
