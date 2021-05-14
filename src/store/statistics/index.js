import { reactive } from 'vue'
import { OPERATOR } from '@/interface/enum'
import { getDataUrl } from '@/api/statistics/data'
import { getFilterUrl, addUrl, removeUrl, updateUrl } from '@/api/statistics/filterTemplate'
import axios from 'axios'

const state = () => ({
  data: [{
    name: '学习发声',
    type: [1],
    time: 90,
    startTime: 1620001841000,
    endTime: 1620007241000,
    subTasks: []
  },
  {
    name: '学习乐理',
    type: [5],
    time: 85,
    startTime: 1620007241000,
    endTime: 1620012641000,
    subTasks: []
  },
  {
    name: '午休',
    type: [1],
    time: 60,
    startTime: 1620016241000,
    endTime: 1620019841000,
    subTasks: []
  },
  {
    name: '练习唱歌',
    type: [3],
    time: 120,
    startTime: 1620019841000,
    endTime: 1620027041000,
    subTasks: []
  },
  {
    name: '打篮球',
    type: [4],
    time: 90,
    startTime: 1620027041000,
    endTime: 1620032441000,
    subTasks: []
  },
  {
    name: '进度总结',
    type: [1],
    time: 120,
    startTime: 1620037841000,
    endTime: 1620045041000,
    subTasks: []
  },
  {
    name: '学习发声',
    type: [1],
    time: 120,
    startTime: 1620084653000,
    endTime: 1620091853000,
    subTasks: []
  },
  {
    name: '学习乐理',
    type: [5],
    time: 120,
    startTime: 1620091853000,
    endTime: 1620099053000,
    subTasks: []
  },
  {
    name: '午休',
    type: [1],
    time: 50,
    startTime: 1620102053000,
    endTime: 1620105034000,
    subTasks: []
  },
  {
    name: '练习唱歌',
    type: [3],
    time: 150,
    startTime: 1620105034000,
    endTime: 1620114034000,
    subTasks: []
  },
  {
    name: '打篮球',
    type: [4],
    time: 90,
    startTime: 1620117634000,
    endTime: 1620123034000,
    subTasks: []
  },
  {
    name: '进度总结',
    type: [1],
    time: 120,
    startTime: 1620126015000,
    endTime: 1620133215000,
    subTasks: []
  },
  {
    name: '学习发声',
    type: [1],
    time: 90,
    startTime: 1620173415000,
    endTime: 1620178815000,
    subTasks: []
  },
  {
    name: '学习乐理',
    type: [5],
    time: 120,
    startTime: 1620178815000,
    endTime: 1620186015000,
    subTasks: []
  },
  {
    name: '午休',
    type: [1],
    time: 70,
    startTime: 1620189021000,
    endTime: 1620193221000,
    subTasks: []
  },
  {
    name: '练习唱歌',
    type: [3],
    time: 100,
    startTime: 1620193221000,
    endTime: 1620199221000,
    subTasks: []
  },
  {
    name: '打篮球',
    type: [4],
    time: 150,
    startTime: 1620199221000,
    endTime: 1620208221000,
    subTasks: []
  },
  {
    name: '进度总结',
    type: [1],
    time: 90,
    startTime: 1620210621000,
    endTime: 1620216021000,
    subTasks: []
  },
  {
    name: '学习发声',
    type: [1],
    time: 90,
    startTime: 1620261021000,
    endTime: 1620266421000,
    subTasks: []
  },
  {
    name: '学习乐理',
    type: [5],
    time: 85,
    startTime: 1620266421000,
    endTime: 1620271521000,
    subTasks: []
  },
  {
    name: '午休',
    type: [1],
    time: 60,
    startTime: 1620275121000,
    endTime: 1620278721000,
    subTasks: []
  },
  {
    name: '练习唱歌',
    type: [3],
    time: 120,
    startTime: 1620278721000,
    endTime: 1620285921000,
    subTasks: []
  },
  {
    name: '打篮球',
    type: [4],
    time: 90,
    startTime: 1620285921000,
    endTime: 1620291321000,
    subTasks: []
  },
  {
    name: '进度总结',
    type: [1],
    time: 120,
    startTime: 1620296721000,
    endTime: 1620303921000,
    subTasks: []
  },
  {
    name: '学习发声',
    type: [1],
    time: 85,
    startTime: 1620345921000,
    endTime: 1620351021000,
    subTasks: []
  },
  {
    name: '学习乐理',
    type: [5],
    time: 85,
    startTime: 1620351021000,
    endTime: 1620356121000,
    subTasks: []
  },
  {
    name: '午休',
    type: [1],
    time: 60,
    startTime: 1620363321000,
    endTime: 1620366921000,
    subTasks: []
  },
  {
    name: '练习唱歌',
    type: [3],
    time: 120,
    startTime: 1620366921000,
    endTime: 1620374121000,
    subTasks: []
  },
  {
    name: '打篮球',
    type: [4],
    time: 90,
    startTime: 1620374121000,
    endTime: 1620379511000,
    subTasks: []
  },
  {
    name: '进度总结',
    type: [1],
    time: 150,
    startTime: 1620383111000,
    endTime: 1620392111000,
    subTasks: []
  },
  {
    name: '学习发声',
    type: [1],
    time: 90,
    startTime: 1620434111000,
    endTime: 1620439511000,
    subTasks: []
  },
  {
    name: '学习乐理',
    type: [5],
    time: 95,
    startTime: 1620439511000,
    endTime: 1620445811000,
    subTasks: []
  },
  {
    name: '午休',
    type: [1],
    time: 60,
    startTime: 1620449411000,
    endTime: 1620453011000,
    subTasks: []
  },
  {
    name: '练习唱歌',
    type: [3],
    time: 120,
    startTime: 1620453011000,
    endTime: 1620460211000,
    subTasks: []
  },
  {
    name: '打篮球',
    type: [4],
    time: 90,
    startTime: 1620460211000,
    endTime: 1620465611000,
    subTasks: []
  },
  {
    name: '进度总结',
    type: [1],
    time: 120,
    startTime: 1620469211000,
    endTime: 1620476411000,
    subTasks: []
  },
  {
    name: '学习发声',
    type: [1],
    time: 80,
    startTime: 1620519611000,
    endTime: 1620524411000,
    subTasks: []
  },
  {
    name: '学习乐理',
    type: [5],
    time: 85,
    startTime: 1620524411000,
    endTime: 1620529559000,
    subTasks: []
  },
  {
    name: '午休',
    type: [1],
    time: 60,
    startTime: 1620533159000,
    endTime: 1620536759000,
    subTasks: []
  },
  {
    name: '练习唱歌',
    type: [3],
    time: 130,
    startTime: 1620536759000,
    endTime: 1620544559000,
    subTasks: []
  },
  {
    name: '打篮球',
    type: [4],
    time: 120,
    startTime: 1620544559000,
    endTime: 1620551759000,
    subTasks: []
  },
  {
    name: '进度总结',
    type: [1],
    time: 120,
    startTime: 1620555359000,
    endTime: 1620562559000,
    subTasks: []
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
          commit('addFilter', { id: res.data, ...filterWithoutId })
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
