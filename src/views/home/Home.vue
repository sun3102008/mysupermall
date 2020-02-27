<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div  slot="center">购物街</div>
    </nav-bar>
    <!-- nav-bar不需要滚动 -->
    <scroll class="content" ref="bscroll" 
      :probe-type='3' @scroll='fooScroll'
      :pull-up-load='true' 
      @pullingUp='fooPullingUp'
    >
      <home-swiper 
        :sonBanners='banners' 
        @swiperImgLoad='fooswiperImgLoad'
      ></home-swiper>
      <home-recommend :sonRecommend='recommends'></home-recommend>
      <home-pop></home-pop>
      <tab-control 
        :sonTitle="['流行','新款','精选']"
        class='tab-control'
        @sonTabClick='fooTabClick'
        ref='tabControl'
      >
      </tab-control>
      <goods-list 
        :goodsList='goods[currentType].list'
      ></goods-list>
    </scroll>
      <!-- 返回顶部图标 -->
    <back-top @click.native="backClick" v-show='isBackTop'></back-top>
  </div>

</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommend from './childComponents/HomeRecommend'
import HomePop from './childComponents/HomePop'
import GoodsList from 'components/content/goods/GoodsList'

import Scroll from 'components/common/scroll/Scroll'
//返回顶部图标
import BackTop from 'components/content/backTop/BackTop'
import TabControl from 'components/content/tabControl/TabControl'

import {getHomeData,getHomeGoods} from 'network/home'
import {debounce} from 'components/common/utils'

export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomePop,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data (){
    return {
      banners:[],
      recommends:[],
      goods:{
        //默认展示第一页
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isBackTop:false,
      tabOffsetTop:0
    }
  },
  created () {
    //在home.js中获取home的数据
    this.getHomeData()
    //2.获取goods页面数据,传'pop',页码
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    
  },
  methods:{
     //返回上部的监听事件
     backClick (){
      //  console.log(this.$refs.scroll.msg)
      // 通过this.$refs.scroll可以拿到scroll对象，
      //this.$refs.scroll.msg就可以访问到scroll对象的属性
      //this.$refs.bscroll相当于scroll 中的this;
      // this.$refs.bscroll.bscroll.scrollTo(0,0,500)

      //简洁写法：调用scroll内的方法，这样让代码看起来简洁
      this.$refs.bscroll.scrollTo(0,0,400)
     },
     //接收scroll传递过得position参数
     fooScroll (position){
      //  console.log(position)
//注：用if做判断，只能将>1000设为true，当其值小于1000 并不能返回false！！！
      // if(-position.y >1000){
      //   this.isBackTop =true;
      // }else{
      //   return false;
      // }
      this.isBackTop = -position.y >1000
     },
    //接收scroll 传来的滚动到底部的 事件
    fooPullingUp(){
      //  console.log('fdsfsd')
      this.getHomeGoods(this.currentType)
     },

     
    //从TabControl中获取pop,new,sell 的index
    fooTabClick(index) {
      // console.log(index)
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
       
    },
  
  //swiper的offsetTop
  fooswiperImgLoad (){
    console.log(this.$refs.tabControl.$el.offsetTop)
  },



    //网络请求相关的方法
     //在home.js中获取home的数据
    getHomeData () {
      getHomeData().then(res =>{
        // console.log(res.data)
        this.banners = res.data.banner.list,
        this.recommends = res.data.recommend.list
      })
    },
     
    //2.获取goods页面数据
    getHomeGoods (type) {
      //page在原来的基础上 加1
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
      // console.log(res.data)
      //此步将res.data.list赋值给this.goods[pop].list中(此时为空)
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page +=1

      //完成上拉加载更多
      this.$refs.bscroll.finishPullUp()
      })
    },
  },
  mounted() {
    //使用事件总线，接收GoodsListItem传来的图片加载完后的事件
    // this.$bus.$on('imgEmit',()=>{
    //   console.log('事件总线')
    //   //$refs 一般要在mounted使用
    //    this.$refs.bscroll.refresh()//这里refresh()要执行30次，性能频繁
    //  })
     
     //使用防抖函数
     const refresh = debounce(this.$refs.bscroll.refresh,50)
     this.$bus.$on('imgEmit',() =>{
       refresh()
     })
    // 1.获取tabControl的offsetTop(此时的offsetTop是未加载完的图片距离)
    //  this.tabOffsetTop = this.$refs.tabControl
    // console.log(this.$refs.tabControl.$el.offsetTop)
},


}
</script>
<style scoped>
  #home{
    padding-top:44px;

    position: relative;
    /* height: 100vh; */
  }
  .home-nav{
    background-color:var(--color-tint);
    color:#fff;

    position: fixed;
    left:0;
    right: 0;
    top:0;
    z-index: 9;
  }
  /* .tab-control{ */
    /* position: sticky; */
    /* top:44px; */
    /* background-color: #fff; */
    /* z-index: 9; */
  /* } */
  /* content的高度利用定位，top=顶部高度，
  *bottom=tabbar高度，左右为0
  */
  .content{
    /* height: 300px; */
    background-color: blue;
    /* overflow: hidden; */

    position: absolute;
    top:44px;
    bottom:40px;
    left:0;
    right:0;
  }
</style>