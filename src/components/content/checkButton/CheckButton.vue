<template>
  <div class="check-button" :class="{active:isChecked}">
    <img src="~assets/img/cart/tick.svg" >
  </div>
</template>
<script>
export default {
  name:'CheckButton',
  props:{
    isChecked:{
      type:Boolean,
      default:true
    }
  }
}
</script>
<style scoped>
  .check-button{
   /* 默认未勾选 */
   border-radius: 50%;
   border:2px solid #aaa; 
  }
  /* 勾选后 */
  .active{
    background-color:  red;
    border-color:red;
  }
</style>