<template>
  <main id="filter-template">
    <el-collapse>
      <el-collapse-item
        v-for="item in data"
        :key="item"
      >
        <template #title>
          <Item :data="item" />
        </template>
        <div>
          {{ item.name }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </main>
</template>

<script>
import { useStore } from 'vuex'
import Item from './Item'

export default {
  name: 'FilterTemplate',
  components: {
    Item
  },
  setup () {
    const state = useStore().state.statistics
    const data = state.filterTemplate

    return {
      data
    }
  }
}
</script>

<style scoped>

</style>
