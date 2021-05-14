import { createStore } from 'vuex'
import taskType from './taskType'
import task from './task'
import statistics from './statistics'
import dateTimePlan from './plan/limitedPlan/dateTime'
import datePlan from './plan/limitedPlan/date'
import unlimitedPlan from './plan/unlimitedPlan'
import orderRule from './rule/order'
import timeRule from './rule/time'
import frequencyRule from './rule/frequency'
import reward from './reward'
import settings from './settings'

export default createStore({
  modules: {
    taskType,
    task,
    statistics,
    dateTimePlan,
    datePlan,
    unlimitedPlan,
    orderRule,
    timeRule,
    frequencyRule,
    reward,
    settings
  }
})
