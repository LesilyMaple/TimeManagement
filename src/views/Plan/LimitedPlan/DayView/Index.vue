<template>
  <div id="day-view">
    <el-date-picker
      v-model="date"
    />
    <div id="konva-container" />
  </div>
  <AddTimeLimitedPlanPopup v-model="showAddTimeLimitedPlanPopup" />
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { planDrawerProxy, planHandleProxy } from './planProxy'
import AddTimeLimitedPlanPopup from './popup/AddTimeLimitedPlanPopup'

export default {
  name: 'LimitedPlanDayView',
  components: {
    AddTimeLimitedPlanPopup
  },
  setup () {
    const store = useStore()

    const showAddTimeLimitedPlanPopup = ref(false)
    const date = ref(new Date('2021-04-17'))

    watch(date, (newDate, oldDate) => {
      store.dispatch('limitedPlanDay/init', newDate.getTime())
        .then(_ => {
          planDrawerProxy.reDraw(oldDate, newDate)
        })
    })

    onMounted(() => {
      planDrawerProxy.init('konva-container', store)
      planHandleProxy.init(showAddTimeLimitedPlanPopup)
      store.dispatch('limitedPlanDay/init', date.value.getTime())
        .then(_ => {
          planDrawerProxy.draw()
        })
    })
    return {
      date,
      showAddTimeLimitedPlanPopup
    }
  }
}
</script>

<style lang="less" scoped>
#day-view{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  #konva-container{
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar{
      height: 0;
    }
  }
}
</style>
