<template>
  <div id="frequency-rule">
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
  name: 'FrequencyRule',
  components: {
    Item
  },
  setup () {
    const store = useStore()

    const data = store.state.frequencyRule.data

    const isAdding = ref(false)

    const remove = (ruleId) => {
      store.dispatch('frequencyRule/remove', ruleId)
    }

    return {
      data,
      isAdding,
      remove
    }
  }
}
</script>

<style lang="less" scoped>
#frequency-rule{
  width: 30%;
}
</style>
