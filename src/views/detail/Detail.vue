<template>
  <div id="detail">
    <detail-nav-bar id="detail-nav"></detail-nav-bar>
    <scroll class="content" ref='scroll'>
      <detail-swiper :childSwiper='topImg'></detail-swiper>
      <detail-base-info :childGoods='goods'></detail-base-info>
      <detail-shop-info :childShop='shops'></detail-shop-info>
      <detail-goods-info :childGoodsInfo='detailInfo' @imgLoad='fooImgLoad'></detail-goods-info>
      <goods-param :childParamsInfo='paramsInfo'></goods-param>
    </scroll>
  </div>
</template>
<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import GoodsParam from './childComponents/GoodsParam'

import {getDetail,GoodsInfo,Shop,GoodsParamInfo} from 'network/detail'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    GoodsParam
  },
  data(){
    return {
      iid:null,
      topImg:[],
      goods:{},
      shops:{},
      detailInfo:{},
      paramsInfo:{}
    }
  },
  created (){
    //this.$route.params.id 是从路由中index.js获取的
    //1.保存iid
    this.iid = this.$route.params.id
    //2.请求数据
    getDetail(this.iid).then(res =>{
      const data =  res.result
      // console.log(res.result.itemInfo)
      console.log(data)
      this.topImg = data.itemInfo.topImages
      this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
      //获取商铺信息
      this.shops = new Shop(data.shopInfo)
      //获取商品详情图片信息
      this.detailInfo = data.detailInfo
      //获取商品参数信息
      this.paramsInfo = new GoodsParamInfo(data.itemParams.info,data.itemParams.rule)
    })
  },
  mounted() {

  },
  methods:{
    fooImgLoad () {
      // console.log('imgload')
      this.$refs.scroll.refresh()
    }
  }
}
</script>
<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  #detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>