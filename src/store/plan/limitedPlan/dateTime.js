import {
  getUrl,
  addPlanUrl, addRelationUrl,
  removePlanUrl, removeRelationUrl,
  updatePlanUrl, updateRelationUrl, updatePositionUrl
} from '@/api/plan/dateTime'
import axios from 'axios'
import { findElement, removeElement } from '@/utils/array'
import { parsePlanId2Number } from '@/utils'

const state = () => ({
  orderLimitedPlanSet: [],
  timeLimitedPlanSet: [],
  planRelation: {},
  date: null
})

const mutations = {
  init (state, data) {
    // 不需要先清除再存入
    // 因为是先操作完后渲染canvas
    // 因此不需要响应性
    state.timeLimitedPlanSet = data.timeLimitedPlanSet
    state.orderLimitedPlanSet = data.orderLimitedPlanSet
    state.planRelation = data.planRelation
  },
  setDate (state, date) {
    state.date = date
  },
  addOrderPlan (state, plan) {
    state.orderLimitedPlanSet.push(plan)
  },
  addTimePlan (state, plan) {
    state.timeLimitedPlanSet.push(plan)
  },
  addRelation (state, relation) {
    const relations = state.planRelation
    const key = Object.keys(relation)[0]
    const value = relation[key]
    if (key in relations) {
      relations[key].push(value)
    } else {
      relations[key] = [value]
    }
  },
  removePlan (state, id) {
    let planSet
    if (id[0] === 'o') {
      planSet = state.orderLimitedPlanSet
    } else {
      planSet = state.timeLimitedPlanSet
    }
    removeElement(planSet, id, 'id')
  },
  removeRelation (state, relation) {
    const key = Object.keys(relation)[0]
    const value = relation[key]
    const arr = state.planRelation[key]
    removeElement(arr, value)
  },
  updateOrderPlan (state, plan) {
    const planSet = state.orderLimitedPlanSet
    const i = findElement(planSet, plan, 'id')
    planSet[i] = plan
  },
  updateTimePlan (state, plan) {
    const planSet = state.timeLimitedPlanSet
    const i = findElement(planSet, plan, 'id')
    planSet[i] = plan
  },
  updateRelation (state, relation) {
    const relations = state.planRelation
    const key = Object.keys(relation)[0]
    const [oldVal, newVal] = relation[key]
    if (relation.type === 0) { // ->
      const arr = relations[key]
      const i = findElement(arr, oldVal)
      arr[i] = newVal
    } else { // <-
      const oldArr = relations[oldVal]
      removeElement(oldArr, key)
      const newArr = relations[newVal]
      newArr.push(key)
    }
  }
}

const actions = {
  init ({ commit }, date) {
    return new Promise(resolve => {
      axios.get(getUrl, {
        params: {
          date: String(date.getTime())
        }
      })
        .then(res => {
          if (res.status === 200) {
            const rawData = res.data

            let orderLimitedPlanSet = rawData.orderLimitedPlanSet
            let timeLimitedPlanSet = rawData.timeLimitedPlanSet
            orderLimitedPlanSet = orderLimitedPlanSet.map(item => {
              return {
                id: 'o' + item.id,
                name: item.planName,
                x: item.x,
                y: item.y,
                time: item.expectedTime,
                taskType: item.typeList,
                subTasks: item.subTasks
              }
            })
            timeLimitedPlanSet = timeLimitedPlanSet.map(item => {
              return {
                id: 't' + item.id,
                name: item.planName,
                startTime: [
                  item.expectedStartTimeBegin ? new Date(Number(item.expectedStartTimeBegin)) : null,
                  item.expectedStartTimeEnd ? new Date(Number(item.expectedStartTimeEnd)) : null
                ],
                endTime: [
                  item.expectedEndTimeBegin ? new Date(Number(item.expectedEndTimeBegin)) : null,
                  item.expectedEndTimeEnd ? new Date(Number(item.expectedEndTimeEnd)) : null
                ],
                time: item.expectedTime,
                taskType: item.typeList,
                subTasks: item.subTasks
              }
            })

            const planRelation = rawData.planRelation

            commit('init', {
              orderLimitedPlanSet,
              timeLimitedPlanSet,
              planRelation
            })
            commit('setDate', date)

            resolve()
          }
        })
    })
  },
  addOrderPlan ({ commit }, plan) {
    return new Promise(resolve => {
      const postPlan = {
        ...plan,
        taskType: { id: plan.taskType[plan.taskType.length - 1] },
        planName: plan.name
      }
      console.log(postPlan)
      axios.post(addPlanUrl, postPlan)
        .then(res => {
          if (res.status === 200) {
            const id = 'o' + res.data
            commit('addOrderPlan', { id, ...plan })
            resolve(id)
          }
        })
    })
  },
  addTimePlan ({ commit }, plan) {
    return new Promise(resolve => {
      const postPlan = {
        ...plan,
        taskType: { id: plan.taskType[plan.taskType.length - 1] },
        expectedStartTimeBegin: plan.startTime[0] ? String(plan.startTime[0].getTime()) : null,
        expectedStartTimeEnd: plan.startTime[1] ? String(plan.startTime[1].getTime()) : null,
        expectedEndTimeBegin: plan.endTime[0] ? String(plan.endTime[0].getTime()) : null,
        expectedEndTimeEnd: plan.endTime[1] ? String(plan.endTime[1].getTime()) : null,
        expectedTime: plan.time
      }
      axios.post(addPlanUrl, postPlan)
        .then(res => {
          if (res.status === 200) {
            const id = 't' + res.data
            commit('addTimePlan', { id, ...plan })
            resolve(id)
          }
        })
    })
  },
  addRelation ({ commit }, relation) {
    return new Promise(resolve => {
      const postRelation = {
        relation: [
          Number(Object.keys(relation)[0].substr(1)),
          Number(Object.values(relation)[0].substr(1))
        ]
      }
      axios.post(addRelationUrl, postRelation)
        .then(res => {
          if (res.status === 200) {
            commit('addRelation', relation)
            resolve()
          }
        })
    })
  },
  removePlan ({ commit, state }, id) {
    return new Promise(resolve => {
      const postId = parsePlanId2Number(id)
      axios.post(removePlanUrl, { id: postId, date: String(state.date.getTime()) })
        .then(res => {
          if (res.status === 200) {
            commit('removePlan', id)
            resolve(res.data)
          }
        })
    })
  },
  removeRelation ({ commit }, relation) {
    axios.post(removeRelationUrl, relation)
      .then(res => {
        if (res.status === 200) {
          commit('removeRelation', relation)
        }
      })
  },
  updateOrderPlan ({ commit }, plan) {
    return new Promise(resolve => {
      const postPlan = {
        ...plan,
        taskType: { id: plan.taskType[plan.taskType.length - 1] },
        id: parsePlanId2Number(plan.id),
        planName: plan.name
      }
      axios.post(updatePlanUrl, postPlan)
        .then(res => {
          if (res.status === 200) {
            commit('updateOrderPlan', plan)
            resolve()
          }
        })
    })
  },
  updateTimePlan ({ commit }, plan) {
    return new Promise(resolve => {
      const postPlan = {
        ...plan,
        taskType: { id: plan.taskType[plan.taskType.length - 1] },
        id: parsePlanId2Number(plan.id),
        planName: plan.name
      }
      axios.post(updatePlanUrl, postPlan)
        .then(res => {
          if (res.status === 200) {
            commit('updateTimePlan', plan)
            resolve()
          }
        })
    })
  },
  updateRelation ({ commit }, relation) {
    return new Promise(resolve => {
      axios.post(updateRelationUrl, relation)
        .then(res => {
          if (res.status === 200) {
            commit('updateRelation', relation)
            resolve()
          }
        })
    })
  },
  updatePosition ({ commit }, payload) {
    const { id, x, y } = payload
    axios.post(updatePositionUrl, { id: Number(id.substr(1)), x: Math.floor(x), y: Math.floor(y) })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
