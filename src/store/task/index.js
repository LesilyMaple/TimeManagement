import axios from 'axios'
import {
  addTaskUrl, getTemplateUrl,
  addCustomTemplateUrl, removeCustomTemplateUrl, updateCustomTemplateUrl,
  addCommonTemplateUrl, removeCommonTemplateUrl, updateCommonTemplateUrl
} from '@/api/task'

const state = () => ({
  common: [{
    id: 1,
    name: 'a',
    time: 40,
    icon: 'icon',
    subTasks: [{
      id: 1,
      text: 'sub 1',
      time: 10
    }, {
      id: 2,
      text: 'sub 2',
      time: 30
    }]
  }],
  custom: []
})

const mutations = {
  initCommon (state, common) {
    state.common.push(...common)
  },

  initCustom (state, custom) {
    state.custom.push(...custom)
  },

  addCommonTemplate (state, template) {
    state.common.push(template)
  },

  addCustomTemplate (state, template) {
    state.custom.push(template)
  },

  removeCommonTemplate (state, id) {
    const common = state.common
    for (let i = 0; i < common; i++) {
      if (common[i].id === id) {
        common.splice(i, 1)
        return
      }
    }
  },

  removeCustomTemplate (state, id) {
    const custom = state.custom
    for (let i = 0; i < custom; i++) {
      if (custom[i].id === id) {
        custom.splice(i, 1)
        return
      }
    }
  },

  updateCommonTemplate (state, template) {
    const common = state.common
    for (let i = 0; i < common; i++) {
      if (common[i].id === template.id) {
        common[i] = template
        return
      }
    }
  },

  updateCustomTemplate (state, template) {
    const custom = state.custom
    for (let i = 0; i < custom; i++) {
      if (custom[i].id === template.id) {
        custom[i] = template
        return
      }
    }
  }
}

const actions = {
  init ({ commit }, data) {
    axios(getTemplateUrl)
      .then(res => {
        if (res.status === 200) {
          commit('initCommon', res.data.common)
          commit('initCustom', res.data.custom)
        }
      })
  },

  addTask ({ commit }, task) {
    axios.post(addTaskUrl, task)
      .then(res => {
        if (res.status === 200) {
          console.log('添加任务成功！')
        }
      })
  },

  addCommonTemplate ({ commit }, template) {
    axios.post(addCommonTemplateUrl, template)
      .then(res => {
        if (res.status === 200) {
          commit('addCommonTemplate', template)
        }
      })
  },

  addCustomTemplate ({ commit }, template) {
    axios.post(addCustomTemplateUrl, template)
      .then(res => {
        if (res.status === 200) {
          commit('addCustomTemplate', template)
        }
      })
  },

  removeCommonTemplate ({ commit }, id) {
    axios.post(removeCommonTemplateUrl, id)
      .then(res => {
        if (res.status === 200) {
          commit('removeCommonTemplate', id)
        }
      })
  },

  removeCustomTemplate ({ commit }, id) {
    axios.post(removeCustomTemplateUrl, id)
      .then(res => {
        if (res.status === 200) {
          commit('removeCustomTemplate', id)
        }
      })
  },

  updateCommonTemplate ({ commit }, template) {
    axios.post(updateCommonTemplateUrl, template)
      .then(res => {
        if (res.status === 200) {
          commit('updateCommonTemplate', template)
        }
      })
  },

  updateCustomTemplate ({ commit }, template) {
    axios.post(updateCustomTemplateUrl, template)
      .then(res => {
        if (res.status === 200) {
          commit('updateCustomTemplate', template)
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
