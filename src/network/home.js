import {request} from './request'

export function getHomeData (){
  return request({
    url:'/home/multidata'
  })
}

//获取首页商品
export function getHomeGoods (type,page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}