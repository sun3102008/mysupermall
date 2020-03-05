<template>
  <div>
    <nav-bar>
        <div slot="left" class="back" @click='backClick'>
          <img src="~assets/img/common/back.svg">
        </div>
        <div slot="center" class="detail-nav">
          <div v-for='(item,index) in titles' :key="index" 
            class="detail-item" @click="itemClick(index)"
            :class="{active:index == currentIndex}"
          >
            {{item}}
          </div>
        </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:'DetailNavBar',
  components:{
    NavBar
  },
  data (){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    itemClick (index) {
      // console.log(index)
      this.currentIndex = index
      this.$emit('detailNavBarClick',index)
    },
    backClick (){
      //也可以用this.$router.back
      //前进forword
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
  .detail-nav{
    display: flex;
    font-style: 12px;
  }
  .detail-item{
    flex:1;
  }
  .active{
    color:var(--color-tint);
  }
  .back img{
    margin-top: 12px;
  }
</style>