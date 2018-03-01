// 路由配置
import Vue from 'vue'
import VueRouter from 'vue-router' // 这是基于vue的一个插件

import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'
import Shopcart from '../component/admin/shopcart/Shopcart.vue'



Vue.use(VueRouter)
const  shopcart = [
     {name:'shopcart', path:'shopcart', component:Shopcart}
]

// 导出路由实例 
export default new VueRouter({
    routes: [
        //登录页面
        { name: 'login', path: '/login', component: Login },

        //后天管理页面
        { name:'admin', path:'./admin', component: Admin, children:[...shopcart]},
       
    ]
})