import axios from 'axios'
import { getUrl, addUrl, removeUrl, updateUrl } from '@/api/rule/order'

const state = () => ({
  data: []
})

const mutations = {
  init (state, data) {
    state.data = data
  },
  add (state, payload) {
    state.data.push(payload)
  },
  remove (state, id) {
    for (let i = 0; i < state.data.length; i++) {
      if (state.data[i].id === id) {
        state.data.splice(i, 1)
        return
      }
    }
  },
  update (state, payload) {
    for (let i = 0; i < state.data.length; i++) {
      const item = state.data[i]
      if (item.id === payload.id) {
        item.bannedTaskType = payload.bannedTaskType
        item.basedTaskType = payload.basedTaskType
        item.order = payload.order
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
  add ({ commit }, payload) {
    axios.post(addUrl, payload)
      .then(response => {
        if (response.status === 200) {
          commit('add', { id: response.data, ...payload })
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
  update ({ commit }, payload) {
    axios.post(updateUrl, payload)
      .then(response => {
        if (response.status === 200) {
          commit('update', payload)
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
