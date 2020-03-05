import {ADD_COUNTER,ADD_TO_CART} from './mutations-type'

export default {
  //任何修改state状态 都要通过mutations(state,参数)
  [ADD_COUNTER](state,payload){
    payload.count ++
  },
  //加入到购物车
  [ADD_TO_CART] (state,payload){
    //增加一个check属性，以便在购物车 勾选;
    payload.checked = true
    state.detailCartList.push(payload)
  }
}