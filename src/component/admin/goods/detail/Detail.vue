<template>
   <div class="detail">
      <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin/goods/list' }">返回上一个级</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin/goods/list' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin/goods/list' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'goodsList'}">商品列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 大表单 -->
        <el-form ref="form" label-position="left" :model="form" label-width="80px" class="detail_from">
            <!-- <el-form-item label="内容标题 ">
                <el-input v-model="form.name"></el-input>
            </el-form-item> -->
            <el-form-item label="内容标题">
                <el-input v-model="form.title"></el-input>
                 <!-- <el-input></el-input> -->
            </el-form-item>

            <el-form-item label="副本标题"> 
                <el-input v-model="form.sub_title"></el-input>
                <!-- <el-input></el-input> -->
            </el-form-item>

            <el-form-item label="所属类别 ">
                <el-select v-model="form.category_id" placeholder="请选择">
                    <!-- 解决当前分类category_id存在的id值bug ，不同一个数字，一个是字符串-->
                    <el-option v-for="item in category" :key="item.category_id" :label="item.title" :value="item.category_id">
                        <span> 
                            <!-- //给子级分类并添加图标 -->
                            <span v-if="item.class_layer  !=1 ">✪</span>
                            <span>{{ item.title }}</span>
                            <!-- 会覆盖下拉列表的值 -->
                            <!-- 喊喊汗啊汗 -->
                        </span> 
                    </el-option>
                    
                </el-select>
            </el-form-item> 

            <el-form-item label="是否发布 ">
                <el-switch v-model="form.status"></el-switch>
            </el-form-item>

            <el-form-item label="推荐类型">
                <el-switch v-model="form.is_slide" active-text="轮播图"></el-switch>
                <el-switch v-model="form.is_top" active-text="置顶"></el-switch>
                <el-switch v-model="form.is_hot" active-text="推荐"></el-switch>
            </el-form-item>

            <el-form-item label="上传封面"> 
                <!-- <el-input v-model="form.a">form.imgList</el-input> -->
                 <!-- :on-preview="handlePreview"
                 :on-remove="handleRemove"监听两个事件用 -->
                <!-- :file-list关联数据-- -->

                 <el-upload
                    class="upload-demo"
                    :file-list="form.imgList"
                    list-type="picture"
                    action="http://localhost:8899/admin/article/uploadimg"
                   :on-success="uploadImg"  
 
                    >
                   
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

             <el-form-item label="上传附件">
                 <!-- <el-input v-model="form.b">form.fileList</el-input> -->
                 <!-- <el-input></el-input> -->
                 <!-- list-type="picture"改为默认格式 -->
                  <el-upload
                    class="upload-demo"
                    :file-list="form.fileList"
                    list-type="picture"
                    action="http://localhost:8899/admin/article/uploadfile"
                    :on-success="uploadfile"  
                     >
                   
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
            </el-form-item>

            <el-form-item label="商品货号">
                <el-input v-model="form.goods_no"></el-input>
            </el-form-item>

             <el-form-item label="库存数量">
                <el-input v-model="form.stock_quantity"></el-input>
            </el-form-item>

             <el-form-item label="市场价格">
                <el-input v-model="form.market_price"></el-input>
            </el-form-item>

            <el-form-item label="销售介格">
                <el-input v-model="form.sell_price"></el-input>
            </el-form-item>

            <el-form-item label="内容摘要">
                <el-input type="textarea" v-model="form.zhaiyao"></el-input>
            </el-form-item>

            <el-form-item label="详细内容">
                <!-- <el-input v-model="form.desc"></el-input> -->
                <!-- <div v-html="form.content"></div> -->
                <quillEditor v-model="form.content"></quillEditor>
            </el-form-item>

 
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存提交</el-button>
                <el-button @click="$router.go(-1)">返回上一页</el-button>
            </el-form-item>
        </el-form>
   </div>
  
</template> 

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'

export default {       
        data(){
            return{
                //1.表单数据
                form:{},
                //2.分类列表数据
                category:[],
                //页面一点进来，就拿到商品id
                id: this.$route.params.id
            }
        },

        methods:{
            //获取商品数据
             getGoods(){
                this.$http.get(this.$api.gsDetail + this.id).then(res =>{
                    if(res.data.status  == 0){
                      
                        this.form = res.data.message;
                        // console.log(123456)
                        // console.log(this.from)
                        //为了让分类类表默认真确显示，把商品category_id数据类型改为number
                        this.form.category_id = +this.form.category_id;
                    }
                })   
             },
             //获取商品分类数据
             getCategory(){
                 this.$http.get(this.$api.ctList + 'goods').then(res =>{
                    if(res.data.status  == 0){
                        this.category = res.data.message;
                        // console.log( this.category )
                        // console.log("*******************************")
                        
                    }
                });

             }, 
             //上传封面 :后端接口只能接受一个封面 
             uploadImg(data){
                //  this.form.imgList  = []; 
                //  this.form.imgList.push(data)
                this.form.imgList = [data];
             }, 

            //  上传附件
            uploadfile(data){
                // console.log("你上传成功啦！")
                //把接口返回的数据保存起来，供将来保存修改使用
                this.form.fileList.push(data) 

            },

            //保存按钮
            onSubmit(){
                this.$http.post(this.$api.gsEdit + this.id,this.form).then(res =>{
                    if(res.data.status == 0){
                        this.$alert("数据修改成功！恭喜你！")
                    }
                }) 
            }
        },

        //调用接口，渲染页面
        created() {
           console.log(this.id)
           console.log(123456789)
           this.getGoods();
           this.getCategory();
        },

        //把富文本注册成子组件
        components: {
             quillEditor
         }

         //


    }


</script>

<style scope lang="less">
    .detail{
        &_from{
            margin-top: 30px;
            width: 700px;
        }
    }

</style>
