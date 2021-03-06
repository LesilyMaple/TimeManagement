import axios from 'axios'
import { getUrl, addUrl, removeUrl, updateUrl } from '@/api/rule/order'

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
        item.bannedTaskType = rule.bannedTaskType
        item.basedTaskType = rule.basedTaskType
        item.order = rule.order
        return
      }
    }
  }
}

const actions = {
  init ({ commit }) {
    axios(getUrl)
      .then(response => {
        if (response.status === 200) {
          commit('init', response.data)
        }
      })
  },
  add ({ commit }, rule) {
    axios.post(addUrl, rule)
      .then(response => {
        if (response.status === 200) {
          commit('add', { id: response.data, ...rule })
        }
      })
  },
  remove ({ commit }, id) {
    axios.post(removeUrl, { id })
      .then(response => {
        if (response.status === 200) {
          commit('remove', id)
        }
      })
  },
  update ({ commit }, rule) {
    axios.post(updateUrl, rule)
      .then(response => {
        if (response.status === 200) {
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
