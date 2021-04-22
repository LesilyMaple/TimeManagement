import { reactive } from 'vue'

const planDetails = {
  data: reactive({
    id: '0',
    name: 'default'
  }),
  get: function () {
    return this.data
  },
  set: function (val) {
    this.data.id = val.id
    this.data.name = val.name
  }
}

export default planDetails
