<template>
  <div id="rule-order">
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
import { useStore } from 'vuex'
import Item from './Item'
import { ref } from 'vue'

export default {
  name: 'OrderRule',
  components: {
    Item
  },
  setup () {
    const store = useStore()

    const data = store.state.orderRule.data

    const isAdding = ref(false)

    const remove = (ruleId) => {
      store.dispatch('orderRule/remove', ruleId)
    }

    return {
      data,
      remove,
      isAdding
    }
  }
}
</script>

<style lang="less" scoped>
#rule-order{
  width: 30%;
}
</style>
