<template>
  <div class="param-info" v-if="Object.keys(childParamsInfo).length !==0">
    <table v-for="(item,index) in childParamsInfo.sizes" :key='index'>
      <tr v-for="(tr,inde) in item" :key="inde">
        <td v-for="(td,ind) in tr" :key="ind">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(item,index) in childParamsInfo.infos" :key="index">
        <td class="info-param-key">{{item.key}}</td>
        <td class="param-value">{{item.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="childParamsInfo.img.length !==0">
      <img :src="childParamsInfo.image" alt="waka">
    </div>
  </div>
</template>
<script>
export default {
  name:'GoodsParam',
  props:{
    childParamsInfo:{
      type:Object,
      default (){
        return {}
      }
    }
  }
}
</script>
<style scoped>
  .param-info{
    padding:20px 15px;
    font-size: 14px;
    border-bottom:5px solid #f2f5f8;
  }
  .param-info table{
    width:100%;
    border-collapse:collapse;
  }
  .param-info table tr{
    height: 42px;
  }
  .param-info table tr td {
    height: 42px;
  }
  .param-info table tr td {
    border-bottom: 1px sollid rgba(100,100,100,.1);
  }
  .info-param-key{
    width: 95px;
  }
  .info-param{
    border-top: 1px solid rgba(0,0,0,.1);
  }
  .param-value{
    color:#eb4868;
  }
  .info-img img{
    width: 100%;
  }
</style>