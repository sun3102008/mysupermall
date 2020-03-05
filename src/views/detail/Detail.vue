<template>
  <div id="detail">
    <detail-nav-bar id="detail-nav" ref="navbar"
      @detailNavBarClick='navBarClick'
    ></detail-nav-bar>
    <scroll class="content" ref='bscroll' :probe-type='3'
      @scroll='fooscroll'
    >
      <detail-swiper :childSwiper='topImg'></detail-swiper>
      <detail-base-info :childGoods='goods'></detail-base-info>
      <detail-shop-info :childShop='shops'></detail-shop-info>
      <detail-goods-info :childGoodsInfo='detailInfo' @imgLoad='fooImgLoad'></detail-goods-info>
      <goods-param ref="param" :childParamsInfo='paramsInfo'></goods-param>
      <detail-comment ref="comment" :childCommentInfo='commentInfo'></detail-comment>
      <goods-list ref="recommend" :goodsList='recommentInfo'></goods-list>
    </scroll>
    <bottom-bar @bootomToCart='AddToCart'></bottom-bar>
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
import DetailComment from './childComponents/DetailComment'

import GoodsList from 'components/content/goods/GoodsList'
import BottomBar from './childComponents/BottomBar'

import {getDetail,getRecommend,GoodsInfo,Shop,GoodsParamInfo} from 'network/detail'
import {debounce} from 'components/common/utils'
import { mapActions } from 'vuex'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    GoodsParam,
    DetailComment,
    GoodsList,
    BottomBar
  },
  data(){
    return {
      iid:null,
      //轮播图
      topImg:[],

      goods:{},
      shops:{},
      detailInfo:{},
      paramsInfo:{},
      //评论信息
      commentInfo:{},
      //推荐信息,array
      recommentInfo:[],
      //获取导航条标题的y值
      navBarScrollY:[],
      navBarDebounceScrollY:null,
      currentIndex:0

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
      // console.log(data)
      this.topImg = data.itemInfo.topImages
      //goods里面有iid
      this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
      //获取商铺信息
      this.shops = new Shop(data.shopInfo)
      // console.log(data)
      //获取商品详情图片信息
      this.detailInfo = data.detailInfo
      //获取商品参数信息
      this.paramsInfo = new GoodsParamInfo(data.itemParams.info,data.itemParams.rule)
      //获取评论信息，有可能信息为零
      // console.log(data.rate.list[0])
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      //使用debounce优化scrollTo代码
      this.navBarDebounceScrollY =debounce(() =>{
          this.navBarScrollY = []
          this.navBarScrollY.push(0)
          this.navBarScrollY.push(this.$refs.param.$el.offsetTop)
          this.navBarScrollY.push(this.$refs.comment.$el.offsetTop)
          this.navBarScrollY.push(this.$refs.recommend.$el.offsetTop)
          this.navBarScrollY.push(Number.MAX_VALUE)
            // console.log(this.navBarScrollY)
      },200)
    })
    //获取推荐的数据
    getRecommend().then(res =>{
      // console.log(res.data)
      this.recommentInfo = res.data.list
    })
  },
  methods:{
    ...mapActions(['addCartList']),
    fooImgLoad () {
      // console.log('imgload')
      this.$refs.bscroll.refresh()
      //对navBarScrollY 使用防抖操作
      this.navBarDebounceScrollY()
    },
    navBarClick (index){
      // console.log(index)
      this.$refs.bscroll.scrollTo(0,-this.navBarScrollY[index],200)
      // console.log(this.navBarScrollY[index])
    },
    fooscroll (position){
      const positionY= - position.y
      let length=this.navBarScrollY.length
      for(let i=0;i<length-1;i++){
        if(this.currentIndex !== i &&(positionY >=this.navBarScrollY[i] && 
        positionY< this.navBarScrollY[i+1])){
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex
        }
      }
    },
    //购物车的添加 事件
    AddToCart (){
      //1.获取购物车需要的数据(图片，标题，价格)
      console.log(this.topImg,this.goods.newPrice,this.iid)
      const cartList = {}
      //购物车里 只需展示一张图片
      cartList.img = this.topImg[0]
      cartList.title = this.goods.title
      cartList.desc = this.goods.desc
      cartList.price = this.goods.realPrice
      cartList.iid = this.iid
      //2.将商品添加到购物车(vuex)
      // this.$store.commit('addCartList',cartList)
      //actions 提交方式是 dispatch
      // this.$store.dispatch('addCartList',cartList).then(res =>{
      //   console.log(res)
      // })

      // 使用mapActions
      this.addCartList(cartList).then(res =>{
        // console.log(this.$toast)
        this.$toast.show(res,2000)
      })

      //3.添加到购物车成功
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