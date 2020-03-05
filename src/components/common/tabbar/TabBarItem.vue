<template>
    <div class="tab-bar-item" @click='itemClick'>
      <slot v-if="!isActive" name="item-img"></slot>
      <slot v-else name="item-img-active"></slot>
      <div :style='activeStyle'>
        <slot name="item-text"></slot>
      </div>
    </div>
</template>
<script>
export default {
  name:'TabBarItem',
  props:{
    path:{
      type:String
    },
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
    return {
      // isActive:true
    }
  },
  computed: {
    //点击谁，谁变为红色
    isActive (){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle (){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
    itemClick () {
      // console.log(this.$router)
      this.$router.push(this.path).catch(err =>{})
    }
  }, 
}
</script>
<style scoped>
  .tab-bar-item {
    flex:1;
    text-align: center;
    font-size: 14px;

  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
  } 
  
</style>