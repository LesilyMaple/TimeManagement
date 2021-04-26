import { createStore } from 'vuex'
import taskType from './taskType'
import currentTask from './currentTask'
import statistics from './statistics'
import limitedPlanDay from './plan/limitedPlan/day'
import orderRule from './rule/order'
import timeRule from './rule/time'
import frequencyRule from './rule/frequency'

export default createStore({
  modules: {
    taskType,
    currentTask,
    statistics,
    limitedPlanDay,
    orderRule,
    timeRule,
    frequencyRule
  }
})
