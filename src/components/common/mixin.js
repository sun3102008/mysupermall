import BackTop from 'components/content/backTop/BackTop'

export const itemListMixin = {
  created() {
    // 获取home的数据
    this.getHomeData()
    //2.获取goods页面数据,传'pop',页码
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
}

