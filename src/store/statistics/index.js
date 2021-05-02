import { reactive } from 'vue'
import { OPERATOR } from '@/interface/enum'
import { getDataUrl } from '@/api/statistics/data'
import { getFilterUrl, addUrl, removeUrl, updateUrl } from '@/api/statistics/filterTemplate'
import axios from 'axios'

const state = () => ({
  data: [{
    name: '学习伪音',
    type: [1],
    time: 114
  }, {
    name: '读《孔乙己》',
    type: [1, 4],
    time: 35
  }, {
    name: '读《红楼梦》',
    type: [1, 4],
    time: 63
  }, {
    name: '看线性代数第一章',
    type: [1, 3, 5],
    time: 144
  }, {
    name: '看线性代数第二章',
    type: [1, 3, 5],
    time: 90
  }, {
    name: '看高等数学第一章',
    type: [1, 3, 6],
    time: 80
  }, {
    name: '逛B站',
    type: [2],
    time: 20
  }, {
    name: '玩lol',
    type: [2],
    time: 180
  }],
  filter: reactive([{
    name: 'my filter',
    names: [{ name: 'a' }, { name: 'b' }],
    types: [{ not: false, type: 'study' }],
    devotions: [{ operator: OPERATOR.EQ, rate: 0 }],
    satisfactions: [{ operator: OPERATOR.EQ, rate: 0 }],
    times: [{ notDate: false, notTime: false }]
  }])
})

const mutations = {
  initFilter (state, data) {
    state.filter.push(...data)
  },

  setDataByFilter (state, taskArray) {
    state.data.splice(0)
    state.data.push(...taskArray)
  },

  addFilter (state, filter) {
    state.filter.push(filter)
  },

  removeFilter (state, id) {

  },

  updateFilter (state, filter) {

  }
}

const actions = {
  init ({ commit }) {
    axios(getFilterUrl)
      .then(res => {
        if (res.status === 200) {
          commit('initFilter', res.data)
        }
      })
  },

  getDataByFilter ({ commit }, filter) {
    axios.post(getDataUrl, filter)
      .then(res => {
        if (res.status === 200) {
          commit('setDataByFilter', res.data)
        }
      })
  },

  addFilter ({ commit }, filterWithoutId) {
    axios.post(addUrl, filterWithoutId)
      .then(res => {
        if (res.status === 200) {
          commit('addFilter', {
            id: res.data, ...filterWithoutId
          })
        }
      })
  },

  removeFilter ({ commit }, id) {
    axios.post(removeUrl, id)
      .then(res => {
        if (res.status === 200) {
          commit('removeFilter', id)
        }
      })
  },

  updateFilter ({ commit }, filter) {
    axios.post(updateUrl, filter)
      .then(res => {
        if (res.status === 200) {
          commit('updateFilter', filter)
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
