import { reactive } from 'vue'

class TaskTemplateMgr {
  data = reactive([])

  init () {
  }

  add (template) {
    this.data.push(template)
  }

  remove (id) {
  }

  updateName (id, name) {
    this.search(id).name = name
  }

  search (id) {
    for (const template of this.data) {
      if (template.id === id) return template
    }
  }
}

class CommonTaskTemplateMgr extends TaskTemplateMgr {
  init () {
    this.data.push({ id: 1, name: 'a', icon: 'a' })
    this.data.push({ id: 2, name: 'b', icon: 'b' })
  }
}
class CustomTaskTemplateMgr extends TaskTemplateMgr {
  init () {
    this.data.push({ id: 1, name: 'aa', icon: 'aa' })
    this.data.push({ id: 2, name: 'bb', icon: 'bb' })
  }
}

const commonTaskTemplateMgr = new CommonTaskTemplateMgr()
const customTaskTemplateMgr = new CustomTaskTemplateMgr()

export { commonTaskTemplateMgr, customTaskTemplateMgr }
