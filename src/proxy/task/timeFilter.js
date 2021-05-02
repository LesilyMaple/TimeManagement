import store from '@/store/rule/time'
import TimeManager from '@/utils/time'

const timeFilter = {
  invoke (task) {
    for (const item of store.state().data) {
      if (!TimeManager.in(task.time, item.time[0], item.time[1])) {
        return 'task is not allowed according the time rule!'
      }
    }
    return true
  }
}
