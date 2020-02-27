<template>
  <div>
    <tab-bar>
     <tab-bar-item path='/home' activeColor='blue'>
       <img slot="item-img" src="~assets/img/tabbar/home.svg" >
       <img slot="item-img-active" src="~assets/img/tabbar/home_active.svg" >
       <div slot="item-text">首页</div>
     </tab-bar-item>
     <tab-bar-item path='/category' activeColor='pink'>
        <img slot="item-img" src="~assets/img/tabbar/category.svg" >
        <img slot="item-img-active" src="~assets/img/tabbar/category_active.svg" >
        <div slot="item-text">分类</div>
     </tab-bar-item>
     <tab-bar-item path='/cart' activeColor='blue'>
        <img slot="item-img" src="~assets/img/tabbar/cart.svg" >
        <img slot="item-img-active" src="~assets/img/tabbar/cart_active.svg" >
        <div slot="item-text">购物车</div>
     </tab-bar-item>
     <tab-bar-item path='/profile' activeColor='blue'>
        <img slot="item-img" src="~assets/img/tabbar/profile.svg" >
        <img slot="item-img-active" src="~assets/img/tabbar/profile_active.svg" >
        <div slot="item-text">我的</div>
     </tab-bar-item>
   </tab-bar>
  </div>
</template>
<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name:'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>
<style  scoped>
  #tab-bar{
    display: flex;
    height: 49px;
    background-color: #f6f6f6;
    /* 定位在最下面 */
    position: fixed;
    left:0;
    right: 0;
    bottom: 0;
  }
</style>