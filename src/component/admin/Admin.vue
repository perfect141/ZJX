<template>
    <!-- <h2>这是注册页面</h2> -->
    <div class="admin">
        <el-container>
         <!-- 公共头部 -->
            <el-header>
               <app-header></app-header>
            </el-header>
            <el-container class="admin_content">
                <!-- 公共的左侧  -->
                <el-aside width="200px">
                    Aside
                    <app-aside> </app-aside>
                 </el-aside>
                <!-- 变化的后天管理页面 -->
                <el-main>
                <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>


     

    </div>
    
</template>

<script>

import Header from './subcom/Header.vue'
import Aside from './subcom/Aside.vue'

export default {
    //注册子组件
   components:{
       appHeader:Header,
       appAside:Aside
   }
  
}
</script>

<style scoped lang="less">
     .el-header {
         background-color: #ccc;
         line-height:60px;
     }
     .el-container {
         height: 100%;
     }
     .el-aside{
         background-color: aqua;
     }
     .el-main {
         background-color: #cc3; 
     }

 
    
    
</style>


