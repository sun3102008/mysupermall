<template >
  <swiper>
        <swiper-item v-for="item in sonBanners" >
          <a :href="item.link">
            <img :src="item.image" @load='imgLoad'>
          </a>
        </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name:'HomeSwiper',
  data(){
    return {
      isLoad:false
    }
  },
  props:{
    sonBanners:{
      type:Array,
      // default默认是个函数，是数组返回数组，是对象返回对象
      default(){
        return []
      }
    }
  },
  methods:{
    imgLoad (){
      //监听图片是否加载完成,将发送4张轮播图改为一张，提升性能
      // console.log('-------')offsetTop
      if(!this.isLoad){
        //只发出一次事件
        this.$emit('swiperImgLoad')
        this.isLoad = true
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
  
</style>