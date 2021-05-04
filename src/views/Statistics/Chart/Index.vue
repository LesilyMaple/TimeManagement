<template>
  <Pie
    v-if="chartType==='pie'"
    :data="data"
  />
  <List
    v-else-if="chartType==='list'"
    :data="data"
  />
  <Scatter
    v-else-if="chartType==='scatter'"
    :data="data"
  />
</template>

<script>
import Pie from './pie/Index'
import List from './list/Index'
import Scatter from './scatter/Index'
import { useStore } from 'vuex'

export default {
  name: 'Chart',
  components: {
    Pie,
    List,
    Scatter
  },
  props: {
    chartType: {
      type: String,
      required: true
    }
  },
  setup () {
    const store = useStore()
    const data = store.state.statistics.data
    return {
      data
    }
  }
}
</script>

<style scoped>

</style>
