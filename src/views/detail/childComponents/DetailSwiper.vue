<template>
  <swiper class="topImg">
    <swiper-item v-for="(item,index) in childSwiper" :key="index" >
      <img :src="item" >
    </swiper-item>
  </swiper>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name:'DetailSwiper',
  props:{
    childSwiper:{
      type:Array,
      default (){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>
<style scoped>
  .topImg{
    height: 300px;
    overflow: hidden;
  }
</style>