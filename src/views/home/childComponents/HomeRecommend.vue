<template>
  <div class="recommend">
    <div class="recommend-item" v-for='(item,sort) in sonRecommend' :key='sort'>
      <a :href="item.link">
        <img :src="item.image">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name:'HomeRecommend',
  props:{
    sonRecommend:{
      type:Array,
      default (){
        return []
      }
    }
  }
}
</script>
<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eeeeee;
  }
  .recommend-item{
    flex:1;
  }
  .recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }

</style>