<template>
  <main id="container" />
</template>

<script>
import { onMounted } from 'vue'
import { planDrawerProxy } from './planProxy'

export default {
  name: 'LimitedPlanDayView',
  setup () {
    onMounted(() => {
      planDrawerProxy.init('container')
    })
    return {
    }
  }
}
</script>

<style lang="less" scoped>
#container{
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar{
    height: 0;
  }
}
</style>
