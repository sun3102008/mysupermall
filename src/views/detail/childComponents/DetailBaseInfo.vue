<template>
  <div v-if="Object.keys(childGoods).length !==0" class="base-info">
    <div class="info-title">{{childGoods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{childGoods.newPrice}}</span>
      <span class="old-price">{{childGoods.oldPrice}}</span>
      <span class="discount" v-if="childGoods.discount">{{childGoods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{childGoods.columns[0]}}</span>
      <span>{{childGoods.columns[1]}}</span>
      <span>{{childGoods.services[childGoods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span 
        class="info-service-item" 
        v-for="index in childGoods.services.length-1" :key='index'
      >
        <img :src="childGoods.services[index-1].icon" >
        <span>{{childGoods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name:'DetailBaseInfo',
  props:{
    childGoods:{
      type:Object,
      default (){
        return {}
      }
    }
  }
}
</script>
<style scoped>
  .base-info{
    margin-top: 15%;
    padding: 0 8px;
    color:#999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title{
    color:#222;
  }
  .info-price{
    margin-top: 1px;
  }
  .info-price .new-price{
    font-style: 24px;
    color:var(--color-high-text);
  }
  .info-price .old-price{
    font-style: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }
  .info-price .discount{
    font-size: 12px;
    padding:2px 5px;
    color:#fff;
    background-color:var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    position:relative;
    top:0;
  }
  .info-other{
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-style: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between
  }
  .info-service{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }
  .info-service-item img{
    width: 14px;
    height: 14px;
    position: relative;
    top:2px;
  }
  .info-service-item span{
    font-style: 13px;
    color:#333;
  }

</style>