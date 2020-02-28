<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      bscroll:null,
      // probeType:1,
      msg:'hahah测试用'
    }
  },
  methods:{
    //封装返回顶部的方法
    scrollTo(x,y,time){
      return this.bscroll && this.bscroll.scrollTo(x,y,time)
    },

    //上拉加载结束
    finishPullUp (){
      this.bscroll && this.bscroll.finishPullUp()
    },

    //刷新功能
    refresh(){
      // console.log(23232)
      this.bscroll.refresh()
    },
    //获取y值
    getScrollY (){
      return this.bscroll ? this.bscroll.y : 0
    }

  },
  mounted() {
    // console.log(this.$refs.wrapper)
    this.bscroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,//true，开启上拉加载事件
      click:true,
    
    })
    // console.log(this.bscroll)可以打印scroll对象


    //scroll自带方法,有第三个参数(毫秒)
    // this.bscroll.scrollTo(0,0)

    //监听滚动的位置
    if(this.probeType ==2 || this.probeType ==3){

      this.bscroll.on('scroll',(position) =>{
        // console.log(position)
        //将position参数 传递到home.vue
        this.$emit('scroll',position)
      })
    }

    //监听scroll 滚动到底部
    if(this.pullUpLoad){
      this.bscroll.on('pullingUp',() =>{
        // console.log('监听到滚动底部')
        // 将事件传递到顶部
        this.$emit('pullingUp')
      })
    }

   
  },
}
</script>
<style scoped>
  
</style>