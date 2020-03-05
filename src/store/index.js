import Vue from 'vue'
import VueX from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//1.安装插件
Vue.use(VueX)

const state = {
   //预存购物车的数据
   detailCartList:[]
}

//2.创建store对象,注意是Vue.store
const store =  new VueX.Store({
  state,
  mutations,
  actions,
  getters
})

//3.暴露
export default store
//4.在main.js 引入