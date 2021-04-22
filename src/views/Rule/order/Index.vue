<template>
  <div id="rule-order">
    <Item
      v-for="item in data"
      :key="item"
      :data="item"
      @remove="remove"
    />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Item from './Item'

export default {
  name: 'OrderRule',
  components: {
    Item
  },
  setup () {
    const store = useStore()

    const data = store.state.orderRule.data

    const remove = () => {
      console.log('remove')
    }

    return {
      data,
      remove
    }
  }
}
</script>

<style lang="less" scoped>
#rule-order{
  width: 30%;
}
</style>
