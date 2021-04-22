<template>
  <div id="rule">
    <Order />
  </div>
</template>

<script>
import Order from './order/Index'

export default {
  name: 'Rule',
  components: {
    Order
  },
  setup () {

  }
}
</script>

<style lang="less" scoped>
#rule{
  width: 100%;
  display: flex;
}
</style>
