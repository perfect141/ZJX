<template>
    <div class="list">
          <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
          <!-- 按钮组, 带搜索框 -->
        <section class="list_btns">
            <el-button plain size="mini" icon="el-icon-plus">新增</el-button>
            <el-button plain size="mini" icon="el-icon-check" @click="all">全选</el-button>
            <el-button plain size="mini" icon="el-icon-close" @click="del">删除</el-button>

            <div class="list_btns_right">
                <el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" 
                    label-width="200px" size="mini" v-model="apiQuery.searchvalue" @blur="search">
                </el-input>
            </div>
        </section>

          <!-- 大表格 -->
           <!-- data属性用来配置表格数据  -->
        <el-table @selection-change="change" ref="multipleTable" :data="tableData3" style="width: 100%">
            <!--1-1 选择框 -->
            <el-table-column type="selection" width="55"></el-table-column>

            <!--1. label用来设置当前列的表头 -->
            <el-table-column label="标题">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="Right Top 提示文字,你是一头猪！！" placement="right-start">
                        <router-link style="color: #666;" :to="{ path:`/admin/goods/detail/${scope.row.title}` }">{{ scope.row.title }}</router-link>
                        <div slot="content"><img :src="scope.row.imgurl" alt="商品图片显示" style="width:200px;"></div>
                    </el-tooltip>
                </template>  
            </el-table-column>

            <!-- 2.当前列要展示对象中的那个字段的值, 就配置prop属性为那个字段名 --> 
            <el-table-column prop="categoryname" label="所属类别" width="120"></el-table-column>
            
            <!-- 3.4.5.6.7当前列要展示对象中的那个字段的值, 就配置prop属性为那个字段名 -->
            <el-table-column prop="stock_quantity" label="库存" width="120" show-overflow-tooltip></el-table-column>

            <el-table-column prop="market_price" label="市场价" width="120" show-overflow-tooltip></el-table-column>

            <el-table-column prop="sell_price" label="销售价" width="120" show-overflow-tooltip></el-table-column>

            <el-table-column label="属性" width="120" show-overflow-tooltip>
            <!-- 注意template要加slot-scope属性 -->
                <template slot-scope="scope">
                   <!-- <span class="el-icon-picture-outline"></span> -->
                    <!-- 1.轮播图：is_slide: 1,  -->
                    
                   <span :class="['el-icon-picture-outline',scope.row.is_slide == 1?'active':'']"></span>
                   <!-- <span class="el-icon-upload2"></span> -->
                   <!-- 2.置顶：is_top: 1, -->
                   <!-- <span :class="['el-icon-upload2','active']"></span> -->
                   <span :class="['el-icon-upload2',scope.row.is_top == 1? 'active':'']"></span>
                   <!-- <span class="el-icon-star-off  active"></span> -->
                   <!-- 3.推荐 is_hot: 1, -->
                   <!-- <span :class="['el-icon-star-off','active']"></span> -->
                   <span :class="['el-icon-star-off',scope.row.is_hot == 1? 'active':'']"></span>
                </template>
            </el-table-column>
             <!-- 8.列表的操作 -->
            <el-table-column label="操作" width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- //使用scope.row可以将数据单元格与表头单元格关联起来 -->
                    <router-link style="color: #666;" :to="{  path:`/admin/goods/detail/${scope.row.title}`}">修改</router-link>
                </template>
            </el-table-column>

        </el-table>
          <!-- 分页 -->
           <div class="block">
                <!-- <span class="demonstration">完整功能</span> -->
                <!-- 1.total:指总条数
                2.@绑定两个事件
                3.page-sizes:控制下拉列表
                4.currentPage4：用来设定当前页 -->
            <!--5.page-size 当前每页数量 -->
                <!-- 6.数据关联操作 -->


                <el-pagination
                :total="apiQuery.total"
                :current-page="apiQuery. pageIndex "
                :page-size="apiQuery.pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[2, 4, 6, 8]"  
                layout="total, sizes, prev, pager, next, jumper"
                >
            </el-pagination>
           </div>
     </div>
</template>

<script> 
export default {
    data(){
        return {
                // 1.搜索功能
                apiQuery: {
                    pageIndex: 1,
                    pageSize: 2,
                    searchvalue: '',
                    // total:400  是死数据
                    total:0
                },

               // 被选中的商品数据
               selectedGoodsList: [],

              tableData3: [
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, 
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, 
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, 
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                multipleSelection: []
        }
    },
    methods:{
         // 搜索
            search() {
                this.getGoodsData();
            },
            
        //获取商品列表的数据    
         getGoodsData(){
              let api = `${this.$api.gsList}?pageIndex=${this.apiQuery.pageIndex}&pageSize=${this.apiQuery.pageSize}&searchvalue=${this.apiQuery.searchvalue}`
                this.$http.get(api).then((res) => {
                    if(res.data.status == 0) {
                        this.tableData3 = res.data.message;  // 把请求回来的数据覆盖原data数量, 表格就会自动刷新
                        //2.通过接口拿取到数量总量  ，赋值给分页组件使用,向data上设定数据
                        this.apiQuery.total = res.data.totalcount

                    }
                });
         }, 

         // 监听多选框状态的变化, 参数可以拿到被选的商品数据
            change(selection) {
                // console.log("哈哈哈哈****")
                // console.log(selection)
                this.selectedGoodsList = selection;
            },

         // 删除按钮
            del() {
                let delIDS = this.selectedGoodsList.map(v => v.id); // 提取所有被选商品的id/ 获取借口，拼接id，返回数据
                console.log(delIDS);
                console.log("***************************************************");
                this.$http.get(this.$api.gsDel + delIDS).then((res) => {
                    // 删除成功后重新获取数据进行渲染
                    if(res.data.status == 0) {
                        this.getGoodsData();
                    }
                })
            },

            //全选的按钮功能，以上给按钮绑定
            all(){
                document.querySelector('.el-checkbox__original').click()   
            },
            //分页：功能
            //1.监听页码变更【切换】的事件
            handleCurrentChange(page){
                // console.log(page);
                this.apiQuery.pageIndex = page;  //动态获取当前页码，重新刷新，
                this.getGoodsData();

            },
            // 2.监听每页数量的变更
            handleSizeChange(size){
                this.apiQuery.pageSize = size;  //动态获取当前页的条数大小，重刷新
                this.getGoodsData();

            },








         toggleSelection(rows){
             if(rows) {
                 rows.forEach(row =>{
                   this.$refs.multipleTable.toggleSelection(row);
                 });
             }else{
                 this.$refs.multipleTable.clearSelection();
             }
         },
            handleSelectionChange(val) {
            this.multipleSelection = val;
            }
        },
        //调用接口获取数据渲染页面表格
          created() {
            this.getGoodsData();
         }
}
</script>

<style scoped lang="less">
   .list {
       .el-breadcrumb-item {
           color:#000;
               }
        // 按钮组样式
        &_btns {
            margin-top: 30px;
            margin-bottom: 20px;

            &_right {
                float: right;
                width: 200px;
                
            }
        }
        [class^=el-icon].active{
            color: #ff9100;
            font-weight: bold;
        }
    }

</style>


