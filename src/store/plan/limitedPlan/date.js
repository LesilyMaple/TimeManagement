import axios from 'axios'
import { getUrl, addUrl, removeUrl, updateUrl } from '@/api/plan/date'
import { removeElement } from '@/utils/array'

const state = () => ({
  data: []
})

const mutations = {
  init (state, data) {
    state.data.splice(0)
    state.data.push(...data)
  },
  add (state, plan) {
    state.data.push(plan)
  },
  remove (state, id) {
    removeElement(state.data, id, 'id')
  },
  update (state, plan) {

  }
}

const actions = {
  init ({ commit }, date) {
    return new Promise(resolve => {
      axios.get(getUrl, {
        params: { date: String(date.getTime()) }
      })
        .then(res => {
          if (res.status === 200) {
            const data = []
            res.data.forEach(rawData => {
              data.push({
                id: 'w' + rawData.id,
                name: rawData.planName,
                taskType: rawData.typeList,
                startDate: new Date(rawData.expectedStartDate),
                endDate: new Date(rawData.expectedEndDate),
                subTasks: rawData.subTasks,
                expectedTime: rawData.expectedTime
              })
            })

            commit('init', data)
            resolve()
          }
        })
    })
  },
  add ({ commit }, rawPlan) {
    return new Promise(resolve => {
      const postPlan = {
        ...rawPlan,
        planName: rawPlan.name,
        taskType: { id: rawPlan.taskType[rawPlan.taskType.length - 1] },
        expectedStartTimeBegin: String(rawPlan.startDate.getTime()),
        expectedEndTimeEnd: String(rawPlan.endDate.getTime())
      }
      axios.post(addUrl, postPlan)
        .then(res => {
          if (res.status === 200) {
            commit('add', { id: 'w' + res.data, ...rawPlan })
            resolve('w' + res.data)
          }
        })
    })
  },
  remove ({ commit }, id) {
    return new Promise(resolve => {
      const postId = {
        id: Number(id.substr(1))
      }
      axios.post(removeUrl, postId)
        .then(res => {
          if (res.status === 200) {
            commit('remove', id)
            resolve()
          }
        })
    })
  },
  update ({ commit }, plan) {
    const postPlan = {
      ...plan,
      id: Number(plan.id.substr(1)),
      planName: plan.name,
      taskType: { id: plan.taskType[plan.taskType.length - 1] },
      expectedStartTimeBegin: String(plan.startDate.getTime()),
      expectedEndTimeEnd: String(plan.endDate.getTime())
    }
    axios.post(updateUrl, postPlan)
      .then(res => {
        if (res.status === 200) {
          commit('update', plan)
        }
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
