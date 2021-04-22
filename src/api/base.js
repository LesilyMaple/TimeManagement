const baseUrl = 'http://timemaster:8088/'
const transform = {
  path: '',
  invoke: function (path) {
    return baseUrl + this.path + path
  }
}

export default transform
