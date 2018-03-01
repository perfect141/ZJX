import Vue from 'vue'

import App from './component/App.vue'


import vueRouter from './router'  // 自动导入该目录下的index.js

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css'

import axios from 'axios'
import api, { domain } from './js/api.js'

import './less/index.less'

Vue.use(ElementUI)
// axios.get(domain + api.logout).them(()=>console.log('登出'))

//配置域名
axios.defaults.baseURL =  domain;
//接收跨域，使其有cooki
axios.defaults.withCredentials = true;
//方便使用，添加到vue原形
Vue.prototype.$http = axios;
Vue.prototype.$api  = api;


new Vue({
    el:'#app',
    render: createElement => createElement(App),
    router: vueRouter
})