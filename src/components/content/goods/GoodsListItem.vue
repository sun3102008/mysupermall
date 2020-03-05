<template>
  <div class="goods-item" @click="goodsClick">
    <img :src="showImg" @load='imgLoad'>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'GoodsListItem',
  props:{
    // 接收从goodsList传来的item数据
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{

    //利用事件总线，传递事件
    imgLoad(){
      //路由是home，才发出图片的点击事件
      if(this.$route.path.indexOf('/home')){
        this.$bus.$emit('imgEmit')
      }
    },
    goodsClick (){
      // console.log(this.goodsItem.iid,'跳转到详情页')
      // replace 没有返回按钮
      //当跳转到详情页时，需向其传递图片iid
      this.$router.push('/detail/'+this.goodsItem.iid)

      //若不采用动态路由获取iid
      // this.$router.push({
      //   path:'/detail',
      //   query:{
      //     iid:this.product.iid
      //   }
      // })     
    }
  },
  computed:{
    showImg (){
      //this.goodsItem.image 是detail详情页的推荐数据
      //this.goodsItem.show.img 是home页面
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>
<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;

    width: 48%;
   } 
   .goods-item img{
    width: 100%;
    border-radius: 5px;
  } 

  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right:0;
    overflow:hidden;
    text-align: center;
  } 

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color:var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  } 
  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>