//将组件挂载到vue原型上
import Toast from 'components/common/toast/Toast'

const obj ={}

//function(vue){} 默认有vue 的参数
obj.install =  function (Vue){
  // console.log('这里执行了install函数')
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //2.使用new 的方式，根据组件构造器，创建出来一个组件对象
  const toast = new toastContrustor()
  //3.将组件对象，手动挂载到某一元素
  toast.$mount(document.createElement('div'))
  //4.toast.$el 获取div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj