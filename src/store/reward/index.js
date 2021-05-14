import axios from 'axios'
import {
  getUrl,
  increasePointUrl, decreasePointUrl,
  addSettingUrl, removeSettingUrl, updateSettingUrl,
  addRecordUrl
} from '@/api/reward'
import { removeElement, updateElement } from '@/utils/array'

const state = () => ({
  point: 0,
  settings: [],
  records: []
})

const mutations = {
  init (state, data) {
    state.point = data.point
    state.settings.push(...data.settings)
    state.records.push(...data.records)
  },
  increasePoint (state, increment) {
    state.point += increment
  },
  decreasePoint (state, decrement) {
    state.point -= decrement
  },
  addSetting (state, setting) {
    state.settings.push(setting)
  },
  removeSetting (state, id) {
    removeElement(state.settings, id)
  },
  updateSetting (state, setting) {
    updateElement(state.settings, setting.id, setting)
  },
  addRecord (state, record) {
    state.records.push(record)
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
  increasePoint ({ commit }, increment) {
    axios.post(increasePointUrl, increment)
      .then(res => {
        if (res.status === 200) {
          commit('increasePoint', increment)
        }
      })
  },
  decreasePoint ({ commit }, decrement) {
    axios.post(decreasePointUrl, decrement)
      .then(res => {
        if (res.status === 200) {
          commit('decreasePoint', decrement)
        }
      })
  },
  addSetting ({ commit }, setting) {
    axios.post(addSettingUrl, setting)
      .then(res => {
        if (res.status === 200) {
          commit()
        }
      })
  },
  removeSetting ({ commit }, id) {
    axios.post(removeSettingUrl, id)
      .then(res => {
        if (res.status === 200) {
          commit('removeSetting', id)
        }
      })
  },
  updateSetting ({ commit }, setting) {
    axios.post(updateSettingUrl, setting)
      .then(res => {
        if (res.status === 200) {
          commit('updateSetting', setting)
        }
      })
  },
  addRecord ({ commit }, record) {
    axios.post(addRecordUrl, record)
      .then(res => {
        if (res.status === 200) {
          commit('addRecord', record)
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
