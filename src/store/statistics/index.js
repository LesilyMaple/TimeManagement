import { reactive } from 'vue'
import { OPERATOR } from '@/interface/enum'

const state = () => ({
  filterTemplate: reactive([{
    name: 'my filter',
    names: [{ name: 'a' }, { name: 'b' }],
    types: [{ not: false, type: 'study' }],
    devotions: [{ operator: OPERATOR.EQ, rate: 0 }],
    satisfactions: [{ operator: OPERATOR.EQ, rate: 0 }],
    times: [{ notDate: false, notTime: false }]
  }])
})

const mutations = {
  addFilterTemplate (state, data) {
    const template = state.filterTemplate
    template.push(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
