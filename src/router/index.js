// 路由配置
import Vue from 'vue'
import VueRouter from 'vue-router' // 这是基于vue的一个插件

import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'

// 商品管理模块相关组件
import GoodsList from '../component/admin/goods/list/List.vue'
import GoodsDetail from '../component/admin/goods/detail/Detail.vue'
import GoodsComment from '../component/admin/goods/comment/Comment.vue'

// import Shopcart from '../component/admin/shopcart/Shopcart.vue'

Vue.use(VueRouter)

const  goods = [
     {name:'goodsList', path: 'goods/list', component: GoodsList},
     {name:'goodsdetail', path: 'goods/detail/:id', component: GoodsDetail},
     {name:'goodscomment', path: 'goods/comment', component: GoodsComment}
]

// 导出路由实例 
let router = new VueRouter({
    routes: [
        //登录页面
        { name: 'login', path: '/login', component: Login },

        //后天管理页面
        { name:'admin', path:'/admin', component: Admin,children:[
            ...goods
        ]},
       
    ]
});
//添加一个前置守卫--解决是否登录过问题
router.beforeEach((to, from, next) => {
    Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res =>{
        let isLogin = false;
        //1.已登录
        if (res.data.code == 'logined'){
            let isLogin  = true;
        }

        //2.如果访问登陆页面
        if(to.name == "login"){
            if (isLogin){
                next({name:'adimin'})
            }else{
                next();
            }
            
        }

        //3.如果访问后台页面
        if(to.name != 'login'){
            if(isLogin){
                next()
            }else{
                next({name:'adimin'})
            }

        }
    })
})
export default router;
