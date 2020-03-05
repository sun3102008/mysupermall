import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入toast的index.js文件
import toast from 'components/common/toast'

//1.安装toast 插件
Vue.use(toast)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
