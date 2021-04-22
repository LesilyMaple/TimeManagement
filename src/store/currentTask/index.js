import { START } from './mutation-types'

const state = () => ({
  name: '',
  type: [],
  subTasks: [{
    id: -4,
    text: 'a',
    time: 0
  }, {
    id: -3,
    text: 'b',
    time: 0
  }, {
    id: -2,
    text: 'c',
    time: 0
  }, {
    id: -1,
    text: 'd',
    time: 0
  }],
  startTime: null,
  endTime: null,
  time: 0,
  mode: 'normal',
  tomato: {
    workTime: 40,
    relaxTime: 5,
    round: 1
  },
  track: [], // 子任务执行的轨迹
  note: '',
  devotion: 3,
  satisfaction: 3
})

const mutations = {
  [START] (state, obj) {
    state.name = obj.name
    state.type = obj.type
    state.subTasks = obj.subTasks
    state.startTime = obj.startTime
    state.mode = obj.mode
    state.tomato = obj.tomato
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
