import axios from 'axios'
import { getUrl, addUrl, removeUrl, updateUrl } from '@/api/plan/unlimited'
import { removeElement, updateElement } from '@/utils/array'

const state = () => ({
  no: [],
  low: [],
  medium: [],
  high: []
})

const mutations = {
  init (state, data) {
    state.no.push(...data.no)
    state.low.push(...data.low)
    state.medium.push(...data.medium)
    state.high.push(...data.high)
  },

  add (state, plan) {
    state.data.push(plan)
  },

  remove (state, id) {
    removeElement(state.data, id)
  },

  update (state, plan) {
    updateElement(state.data, plan.id)
  }
}

const actions = {
  init ({ commit }) {
    axios(getUrl)
      .then(res => {
        if (res.status === 200) {
          commit('init', res.data)
        }
      })
  },

  add ({ commit }, rawPlan) {
    axios.post(addUrl, rawPlan)
      .then(res => {
        if (res.status === 200) {
          commit('add', { id: res.data, ...rawPlan })
        }
      })
  },

  remove ({ commit }, id) {
    axios.post(removeUrl, id)
      .then(res => {
        if (res.status === 200) {
          commit('remove', id)
        }
      })
  },

  update ({ commit }, plan) {
    axios.post(updateUrl, plan)
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
