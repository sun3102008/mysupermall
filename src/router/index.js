import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import Home from 'views/home/Home'
// import Cart from 'views/cart/Cart'
// import Category from 'views/category/Category'
// import Profile from 'views/profile/Profile'
// const Home =()=>import('../views/home/Home')
const Home = ()=> import('views/home/Home')
const Cart = ()=> import('views/cart/Cart')
const Category = ()=> import('views/category/Category')
const Profile = ()=> import('views/profile/Profile')
const Detail = ()=> import('views/detail/Detail')

const routes = [
   {
     path:'',
     redirect:'/home'
   }, 
   {
     path:'/home',
     component:Home
   },
   {
    path:'/cart',
    component:Cart
   },
   {
    path:'/category',
    component:Category
   },
   {
    path:'/profile',
    component:Profile
   },
   {
    path:'/detail/:id',
    component:Detail
   }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
