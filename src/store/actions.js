import {ADD_COUNTER,ADD_TO_CART} from './mutations-type'

export default {
  addCartList(context,payload){
    return new Promise((resolve,reject) =>{
    /*需判断添加的商品是否 是同一商品；可以根据商品的iid判断，
    *如果iid相同，则商品个数(count)+1    
    */
    // state.detailCartList.push(payload)
    //1.判断iid是否相同
    let detailCartiid = context.state.detailCartList.find( item =>item.iid ===payload.iid)
    //2.iid相同，则数量加+1
    if(detailCartiid){
      // detailCartiid.count +=1
      context.commit(ADD_COUNTER,detailCartiid)
      resolve('当前的商品数量+1')
    }else{
      payload.count = 1
      // context.state.detailCartList.push(payload)
      context.commit(ADD_TO_CART,payload)
      resolve('添加了新商品')
    }
    })
  }
}