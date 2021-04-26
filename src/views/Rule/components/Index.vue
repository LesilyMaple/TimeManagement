<template>
  <div id="rule">
    <Frequency />
    <Time />
    <Order />
  </div>
</template>

<script>
import Frequency from './frequency/Index'
import Time from './time/Index'
import Order from './order/Index'

export default {
  name: 'Rule',
  components: {
    Frequency,
    Time,
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
