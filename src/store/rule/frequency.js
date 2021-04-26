import axios from 'axios'
import { getUrl, addUrl, removeUrl, updateUrl } from '@/api/rule/frequency'

const state = () => ({
  data: []
})

const mutations = {
  init (state, data) {
    state.data.push(...data)
  },
  add (state, rule) {
    state.data.push(rule)
  },
  remove (state, id) {
    for (let i = 0; i < state.data.length; i++) {
      if (state.data[i].id === id) {
        state.data.splice(i, 1)
        return
      }
    }
  },
  update (state, rule) {
    for (let i = 0; i < state.data.length; i++) {
      const item = state.data[i]
      if (item.id === rule.id) {
        item.taskType = rule.taskType
        item.min = rule.min
        item.max = rule.max
        item.time = rule.time
        return
      }
    }
  }
}

const actions = {
  init ({ commit }) {
    axios(getUrl).then(res => {
      if (res.status === 200) {
        commit('init', res.data)
      }
    })
  },
  add ({ commit }, rule) {
    axios.post(addUrl, rule).then(res => {
      if (res.status === 200) {
        commit('add', { id: res.data, ...rule })
      }
    })
  },
  remove ({ commit }, id) {
    axios.post(removeUrl, { id })
      .then(res => {
        if (res.status === 200) {
          commit('remove', id)
        }
      })
  },
  update ({ commit }, rule) {
    axios.post(updateUrl, rule)
      .then(res => {
        if (res.status === 200) {
          commit('update', rule)
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
