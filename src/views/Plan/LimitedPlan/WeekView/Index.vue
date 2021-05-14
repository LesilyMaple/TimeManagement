<template>
  <div
    ref="calendarEl"
    id="week-calendar"
  />
  <AddPlanPopup
    v-model="showAddPlanPopup"
    :date="selectedDate"
  />
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import AddPlanPopup from '../../LimitedPlan/popup/AddPlanPopup'
import { planDrawerProxy, planHandleProxy } from './planProxy'

export default {
  name: 'WeekView',
  components: {
    AddPlanPopup
  },
  props: {
    date: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const calendarEl = ref(null)

    const showAddPlanPopup = ref(false)

    const selectedDate = ref(new Date())

    watch(() => props.date, () => {
      planHandleProxy.setDate(props.date)
    })

    onMounted(() => {
      planDrawerProxy.init(calendarEl.value)
      planHandleProxy.init(store)
      planHandleProxy.onDateClick(info => {
        selectedDate.value = info.date
        showAddPlanPopup.value = true
      })
      planDrawerProxy.renderEvents(props.date)
    })

    return {
      calendarEl,
      showAddPlanPopup,
      selectedDate
    }
  }
}
</script>

<style lang="less" scoped>
#week-calendar{
  height: 93%;
}
</style>
