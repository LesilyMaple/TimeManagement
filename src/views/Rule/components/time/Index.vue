<template>
  <div id="time-rule">
    <Item
      v-for="item in data"
      :key="item"
      :data="item"
      @remove="remove($event)"
    />
    <Item
      v-if="isAdding"
      :readonly="false"
      @added="isAdding=false"
      @cancel="isAdding=false"
    />
    <el-button
      @click="isAdding=true"
      icon="el-icon-plus"
      size="mini"
    />
  </div>
</template>

<script>
import Item from './Item'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'TimeRule',
  components: {
    Item
  },
  setup () {
    const store = useStore()

    const data = store.state.timeRule.data

    const isAdding = ref(false)

    const remove = (ruleId) => {
      store.dispatch('timeRule/remove', ruleId)
    }

    return {
      data,
      isAdding,
      remove
    }
  }
}
</script>

<style scoped>
#time-rule{
  width: 30%;
}
</style>
