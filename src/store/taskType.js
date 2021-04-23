import axios from 'axios'
import { updateNameUrl, getUrl, addUrl, removeUrl } from '@/api/taskType'

const state = () => ({
  data: {
    id: -1,
    name: 'root',
    children: []
  },
  options: []
})

const mutations = {
  init (state, data) {
    state.data.children = data
    this.commit('taskType/update')
  },

  updateName (state, {
    type,
    name
  }) {
    type.name = name
    this.commit('taskType/update')
  },

  removeType (state, {
    parent,
    type
  }) {
    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i] === type) {
        parent.children.splice(i, 1)
      }
    }
    this.commit('taskType/update')
  },

  addType (state, {
    parent,
    type
  }) {
    parent.children.push(type)
    this.commit('taskType/update')
  },

  update (state) {
    state.options.push(...JSON.parse(JSON.stringify(state.data.children)
      .replace(/name/g, 'label')
      .replace(/id/g, 'value'))
    )
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

  updateName ({ commit }, {
    type,
    name
  }) {
    axios.post(updateNameUrl, {
      id: type.id,
      name: name
    })
      .then(response => {
        if (response.status === 200) {
          commit('updateName', {
            type,
            name
          })
        }
      })
  },

  removeType ({ commit }, {
    parent,
    type
  }) {
    axios.post(removeUrl, {
      id: type.id
    })
      .then(response => {
        if (response.status === 200) {
          commit('removeType', {
            parent,
            type
          })
        }
      })
  },

  addType ({ commit }, {
    parent,
    name
  }) {
    axios.post(addUrl, {
      planTypeEntity: { name: name },
      parent_id: parent.id
    })
      .then(response => {
        if (response.status === 200) {
          const type = {
            id: response.data,
            name: name,
            children: []
          }

          commit('addType', {
            parent,
            type
          })
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
