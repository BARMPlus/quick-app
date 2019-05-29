import Vue from 'vue'
import VConsole from 'vconsole'
import 'utils/vant'
import 'utils/flexible'
import router from './router'
import store from './store'
import App from './App.vue'

process.env.NODE_ENV !== 'production' && new VConsole({ maxLogNumber: 5000, defaultPlugins: ['network', 'element', 'storage'] }) // console.log调试工具

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
