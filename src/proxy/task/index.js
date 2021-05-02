import Task from '@/interface/task'

const index = {
  filters: [],
  task: null,
  get (task) {
    for (const filter of this.filters) {
      const status = filter.invoke(task)
      if (!status) return status
    }
    return new Task(task)
  },
  addFilter (filter) {
    this.filters.push(filter)
  },
  removeFilter (filter) {
  }
}

export default index
