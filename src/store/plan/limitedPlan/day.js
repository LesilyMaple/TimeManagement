import {
  getUrl,
  addPlanUrl, addRelationUrl,
  removePlanUrl, removeRelationUrl,
  updateTimePlanUrl, updateOrderPlanUrl, updateRelationUrl
} from '@/api/plan/day'
import axios from 'axios'
import { findElement, removeElement } from '@/utils/array'
import taskType from '@/store/taskType'

const state = () => ({
  orderLimitedPlanSet: [{
    id: 'o1',
    name: 'a',
    pos: {
      x: 100,
      y: 200
    }
  }, {
    id: 'o2',
    name: 'b',
    pos: {
      x: 200,
      y: 300
    }
  }, {
    id: 'o3',
    name: 'c',
    pos: {
      x: 300,
      y: 400
    }
  }, {
    id: 'o4',
    name: 'd',
    pos: {
      x: 400,
      y: 500
    }
  }, {
    id: 'o5',
    name: 'e',
    pos: {
      x: 600,
      y: 700
    }
  }, {
    id: 'o6',
    name: 'f',
    pos: {
      x: 800,
      y: 900
    }
  }],
  timeLimitedPlanSet: [{
    id: 't1',
    name: 'aa',
    startTime: ['', '8:02'],
    endTime: ['9:00']
  }, {
    startTime: ['10:00', '11:30'],
    startType: 0,
    endTime: ['12:20', '13:10'],
    endType: 1,
    id: 't2',
    name: 'bb'
  }, {
    startTime: ['14:00'],
    startType: 0,
    endTime: [],
    endType: [],
    id: 't3',
    name: 'cc'
  }, {
    startTime: [],
    startType: [],
    endTime: ['15:50'],
    endType: 1,
    id: 't4',
    name: 'dd'
  }],
  planRelation: {
    o1: ['o3', 't1'],
    o2: ['o3'],
    o3: ['o4', 'o5'],
    o4: ['o6'],
    o5: ['o6'],
    o6: [],
    t1: []
  }
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
          date: String(date)
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
                time: item.expectedTime
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
                time: item.expectedTime
              }
            })

            const planRelation = rawData.planRelation

            commit('init', {
              orderLimitedPlanSet,
              timeLimitedPlanSet,
              planRelation
            })

            console.log(orderLimitedPlanSet,
              timeLimitedPlanSet,
              planRelation)

            resolve()
          }
        })
    })
  },
  addOrderPlan ({ commit }, plan) {
    return new Promise(resolve => {
      plan.taskType = taskType[taskType.length - 1]
      axios.post(addPlanUrl, plan)
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
      plan.taskType = taskType[taskType.length - 1]
      const expectedTime = plan.time
      delete plan.time
      plan.expectedTime = expectedTime
      axios.post(addPlanUrl, plan)
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
      const sendRelation = {
        relation: [
          Number(Object.keys(relation)[0].substr(1)),
          Number(Object.values(relation)[0].substr(1))
        ]
      }
      console.log(sendRelation)
      axios.post(addRelationUrl, sendRelation)
        .then(res => {
          if (res.status === 200) {
            commit('addRelation', relation)
            resolve()
          }
        })
    })
  },
  removePlan ({ commit }, id) {
    return new Promise(resolve => {
      id = Number(id.substr(1))
      axios.post(removePlanUrl, { id })
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
      axios.post(updateOrderPlanUrl, plan)
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
      axios.post(updateTimePlanUrl, plan)
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
  updatePosition (context, payload) {
    const { plan, x, y } = payload
    plan.pos.x = x
    plan.pos.y = y
    // axios
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
