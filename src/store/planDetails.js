import { reactive } from 'vue'

const planDetails = {
  data: reactive({
    id: 'e',
    name: 'default',
    x: 0,
    y: 0
  }),
  get: function () {
    return this.data
  },
  set: function (val) {
    console.log(val)
    for (const key in this.data) {
      delete this.data[key]
    }
    Object.assign(this.data, val)
    this.onChange(this.data.id)
  },
  onChange: function (id) {}
}

export default planDetails
