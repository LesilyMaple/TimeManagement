import { createStore } from 'vuex'
import taskType from './taskType'
import task from './task'
import statistics from './statistics'
import limitedPlanDay from './plan/limitedPlan/day'
import orderRule from './rule/order'
import timeRule from './rule/time'
import frequencyRule from './rule/frequency'
import settings from './settings'

export default createStore({
  modules: {
    taskType,
    task,
    statistics,
    limitedPlanDay,
    orderRule,
    timeRule,
    frequencyRule,
    settings
  }
})
