<template>
  <div class="tab-control">
    <div 
      class="tab-item" 
      v-for="(item,index) in sonTitle" :key='index'
      :class="{active:index === currentIndex}"
      @click='itemClick(index)'
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'TabControl',
  data(){
    return {
      currentIndex:0
    }
  }, 
  props:{
    sonTitle:{
      type:Array,
      //当default默认是对象或数组，default是一个方法
      default (){
        return []
      }
    }

  },
  methods:{
    itemClick(index){
      // console.log(index)
      this.currentIndex = index
      // console.log(this.currentIndex)

      //向外传出点击事件
      this.$emit('sonTabClick',index)
    }
  },
 
}
</script>
<style scoped>
  .tab-control{
    display: flex;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
  }
  .tab-item{
    flex:1;
    text-align: center;
  }
  .active{
    color:var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>