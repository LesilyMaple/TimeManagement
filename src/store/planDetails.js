import { ref } from 'vue'

const planDetails = {
  data: ref({
    id: 'e',
    name: 'default',
    x: 0,
    y: 0
  }),
  get: function () {
    return this.data.value
  },
  set: function (val) {
    console.log(val)
    this.data.value = val
    this.onChange(this.data.value.id)
  },
  clear: function () {
    this.data.value = {}
    this.onChange('')
  },
  onChange: function (id) {}
}

export default planDetails
