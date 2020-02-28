<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>
<script>
import DetailNavBar from './childComponents/DetailNavBar'
export default {
  name:'Detail',
  components:{
    DetailNavBar
  },
  data(){
    return {
      iid:null
    }
  },
  created (){
    //this.$route.params.id 是从路由中index.js获取的
    //1.保存iid
    this.iid = this.$route.params.id
    //2.请求数据
  }
}
</script>
<style scoped>
  
</style>