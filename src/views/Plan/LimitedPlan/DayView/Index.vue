<template>
  <div id="konva-container" />
  <AddTimeLimitedPlanPopup
    v-model="showAddTimeLimitedPlanPopup"
    :date="date"
  />
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { planDrawerProxy, planHandleProxy } from './planProxy'
import AddTimeLimitedPlanPopup from '../popup/AddTimeLimitedPlanPopup'

export default {
  name: 'DayView',
  props: {
    date: {
      type: Object,
      required: true
    }
  },
  components: {
    AddTimeLimitedPlanPopup
  },
  setup (props) {
    const store = useStore()

    const showAddTimeLimitedPlanPopup = ref(false)

    watch(() => props.date, (newDate, oldDate) => {
      store.dispatch('dateTimePlan/init', newDate)
        .then(_ => {
          planDrawerProxy.reDraw(oldDate, newDate)
        })
    })

    onMounted(() => {
      planDrawerProxy.init('konva-container', store)
      planHandleProxy.init(showAddTimeLimitedPlanPopup)
      store.dispatch('dateTimePlan/init', props.date)
        .then(_ => {
          planDrawerProxy.draw()
        })
    })
    return {
      showAddTimeLimitedPlanPopup
    }
  }
}
</script>

<style lang="less" scoped>
#konva-container {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 0;
  }
}
</style>
