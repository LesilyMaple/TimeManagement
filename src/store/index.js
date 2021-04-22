import { createStore } from 'vuex'
import taskType from './taskType'
import currentTask from './currentTask'
import statistics from './statistics'
import limitedPlanDay from './plan/limitedPlan/day'
import orderRule from './rule/order'

export default createStore({
  modules: {
    taskType,
    currentTask,
    statistics,
    limitedPlanDay,
    orderRule
  }
})
