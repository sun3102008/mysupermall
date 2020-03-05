<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button class="checkBtn" 
            :is-checked="isAllChecked" 
            @click.native="allChecked"
      ></check-button>
      <div>全选</div>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="goCalc" >
      去计算({{checkLength}})
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice (){
      return '￥' + this.$store.state.detailCartList.
               filter(item =>{return item.checked})
               .reduce((preValue,item)=>{ 
               return preValue + item.price * item.count
         },0).toFixed(2)
    },
    checkLength (){
      return this.$store.state.detailCartList.filter(item =>item.checked).length
    },
    //全选按钮的显示状态(只要有一个未勾选，不 全选)，返回一个布尔值，传递给button.vue
    isAllChecked (){
      //没有数据的时候，全选 未勾中
      if (this.cartList.length === 0) {
        return false
      }
      // (this.$store.state.detailCartList.filter(item =>!item.checked).length)是
      // 找到未被勾选(!item.checked)的长度，只有为数字为0，取反才是true，其余全是false；
      // return !(this.$store.state.detailCartList.filter(item =>!item.checked).length)

      //使用数组的find();使用此方法判断未勾选状态,对未勾选状态取反，得到布尔值；
      
      return !this.cartList.find(item => !item.checked)
    }

  },
  methods:{
    //根据计算属性isAllChecked
    allChecked (){
      //找本组件的计算属性，要加this
      if(this.isAllChecked){//全选中,要遍历数据，将所有的false 改为true
        this.cartList.forEach(item =>item.checked = false)
      } 
      else{//部分或全部 未被选中.使用遍历将数组的checked 更改
        this.cartList.forEach(item =>item.checked = true)
      }
    }
  }
}
</script>
<style scoped>
  .cart-bottom-bar{
    position: absolute;
    display: flex;

    height: 40px;
    line-height: 40px;
    bottom:40px;
    left: 0;
    right:0;
  }
  .check-content{
    width: 100px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    width:20px;
  }
  .checkBtn{
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
    /* display: block; */
    /* justify-content: center; */
    /* align-items: center; */
  }
  .price{
    flex:1;
    text-align: center;
    /* margin-left: 10px; */
  }
  .goCalc{
    width: 90px;
    color:#fff;
    background-color: red;
  }
</style>