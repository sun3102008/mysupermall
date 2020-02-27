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
      // console.log('-------')offsetTop
      this.$emit('swiperImgLoad')
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