import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

const app = createApp(App)

app.directive('disabled', (el, binding) => {
  el.style.color = '#555555'
})

installElementPlus(app)

store.dispatch('taskType/init')
store.dispatch('orderRule/init')
store.dispatch('timeRule/init')
store.dispatch('frequencyRule/init')
store.dispatch('statistics/init')
store.dispatch('unlimitedPlan/init')

app.use(store).use(router).mount('#app')
