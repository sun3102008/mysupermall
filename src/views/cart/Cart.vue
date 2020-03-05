<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
      <cart-list></cart-list>
    <!-- 底部结算 -->
    <cart-bottom-bar class='cart-bottom-bar' ></cart-bottom-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComponents/CartList'
import CartBottomBar from './childComponents/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  },
}
</script>
<style scoped>
  .cart{
    height: 100vh;
  }
  .cart-nav{
    background-color: var(--color-tint);
    color:#fff;
  }
  /* .cart-bottom-bar{
    background-color: blue;
    height: 40px;
    position: absolute;
    bottom:40px;
    left: 0;
    right:0;
  } */

</style>