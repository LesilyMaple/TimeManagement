import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import MainMgr from '@/store/MainMgr'

const app = createApp(App)
installElementPlus(app)

store.dispatch('taskType/init')
store.dispatch('orderRule/init')
MainMgr.init()

app.use(store).use(router).mount('#app')
