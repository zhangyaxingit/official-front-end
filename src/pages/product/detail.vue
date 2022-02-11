<template>
  <div class="product-container">
    <div class="wrap-header">
      <div class="title-contianer">
        <el-button type="text" @click="goBack" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
    <!-- <div>{{curProduct}}</div> -->
    <div class="base-info">
      <h3>{{curProduct.title}} <el-button
          type="text"
          @click="showBannerDialog"
          style="margin-left: 10px; padding-right: 8px; padding-left: 8px"
          >编辑基本信息</el-button></h3>
      <p class="summary">概述： {{curProduct.desc || '--'}}</p>
      <p class="product-type">所属类目： {{curProduct.type}}</p>
    </div>
    <el-divider></el-divider>
    <div id="ArticleTextContent">
      <TextEditor :txt="curProduct.html" @change="htmlChange"/>
    </div>
      <el-dialog title="修改历史" v-model="manageOrgShow">
        <el-table :data="orgHistory">
          <el-table-column property="name" label="修改人" width="200"></el-table-column>
          <el-table-column property="date" label="修改时间" width="150"></el-table-column>
          <el-table-column property="address" label="修改内容"></el-table-column>
        </el-table>
      </el-dialog>

      <el-dialog
      v-model="basicDialogVisible"
      title="编辑产品基本信息"
    >
      <el-form :model="productForm">
        <el-form-item label="产品名称">
          <el-input v-model="productForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="产品所属类目">
          <el-select v-model="productForm.type" placeholder="请选择">
            <el-option
              v-for="item in categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="概述">
          <el-input v-model="productForm.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="eidtProduct">保存</el-button>
        </span>
      </template>
    </el-dialog>

      <el-dialog title="修改历史" v-model="managePriShow">
        <el-table :data="priHistory">
          <el-table-column property="date" label="数据资源名称" width="150"></el-table-column>
          <el-table-column property="name" label="数据资源id" width="200"></el-table-column>
          <el-table-column property="address" label="数据权限"></el-table-column>
          <el-table-column property="do" label="操作"></el-table-column>
        </el-table>
      </el-dialog>

      <el-dialog title="编辑数据权限"  v-model="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="数据权限" >
            <el-select v-model="right" placeholder="请选择权限">
              <el-option label="可查看， 不可调用" value="1"></el-option>
              <el-option label="不可查看， 不可调用" value="2"></el-option>
              <el-option label="可查看， 审批中" value="3"></el-option>
              <el-option label="可查看， 可调用" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="toggleDialog">取 消</el-button>
              <el-button type="primary" @click="ensure">确 定</el-button>
        </template>
      </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, computed,watch } from 'vue'
import TextEditor from "../../components/TextEditor/Index.vue";
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'manage',
  components: { TextEditor },
  setup() {
    let type = ref('manageOrg')
    let timer:any = null 
    let manageOrgShow =ref(false)
    let managePriShow =ref(false)
    let dialogFormVisible =ref(false)
    let basicDialogVisible = ref(false)
    let content = ref('')
    let opType = ref('new')
    let store = useStore()
    const product = computed(() => store.state.product)
    const list = computed(() => store.state.product.list)

    let router = useRouter()
    let route = useRoute()
    let curProduct = ref({
      id: 0,
      title: '',
      desc: '',
      status: '',
      type: '',
      html: ''
    })

    const categoryOptions = ref([
      { label: "类目一", value: 1 },
      { label: "类目二", value: 2 },
      { label: "类目三", value: 3 },
    ]);

    

    const productForm = ref({
      title: "",
      type: 0,
      desc: "",
    });
    
    let form = reactive({
      data: {
        institution: '',
        leader: '',
        responsible: '',
        contact: '',
        email: ''
      }
    })

    let right = ref('')

    onMounted(() => {
      const {id, type} = route.params
      opType.value = `${type}`
      curProduct.value = product.value.list.find((item:any) => item.id == id)
      // console.log(product.value)
      // console.log(product.value.find((item:any) => item.id == id).html)
    })

    const goBack = () => {
      router.back()
    }

    const ensure = () => {
      // this.$message({
      //    message: '提交成功',
      //   type: 'success'
      // })
      goBack()
    }

    const showBannerDialog = () => {
      basicDialogVisible.value = true
      productForm.value = {
        title: curProduct.value.title,
        desc: curProduct.value.desc,
        type: parseInt(curProduct.value.type, 10) ,
      }
    }

    const toggleDialog = () => {
      dialogFormVisible.value = !!dialogFormVisible
    }

    const eidtProduct = () => {
      basicDialogVisible.value = false
      const newData = {
          title: productForm.value.title,
          desc: productForm.value.desc,
          type: `${productForm.value.type}`,
          status: curProduct.value.status,
          html: curProduct.value.html,
          id: curProduct.value.id,
        }
      store.dispatch("product/updateProduct", {
        data: newData,
        cb: () => {
          curProduct.value = newData
        }
      });
    }

    // const debounce = (fn,delay) =>{
    //   let timer = null //借助闭包
    //   return function() {
    //       if(timer) {
    //           clearTimeout(timer) 
    //       }
    //       timer = setTimeout(fn,delay) // 简化写法
    //   }
    // }

    const htmlChange = (htmlInfo:string) => {
      // console.log(222222, htmlInfo)
      if(timer) {
        clearTimeout(timer) 
      }
      timer = setTimeout(() => {
        saveHtml(htmlInfo)
      }, 1000) // 简化写法
    }


    const saveHtml = (htmlInfo:string) => {
      

      const newData = {
        ...curProduct.value,
        html: htmlInfo,
      }
      console.log(333, htmlInfo)
      store.dispatch("product/updateProduct", {
        data: newData,
        cb: () => {
          curProduct.value = newData
        }
      });
    }
    
    return {
      form,
      curProduct,
      htmlChange,
      manageOrgShow,
      managePriShow,
      dialogFormVisible,
      basicDialogVisible,
      showBannerDialog,
      eidtProduct,
      categoryOptions,
      productForm,
      content,
      right,
      goBack,
      ensure,
      toggleDialog,
    }
  }
}) 

</script>
<style lang="scss"  scoped>

.product-container {
  padding: 20px; 
  background: #fff;
  height: 90%;
  display: flex;
  flex-direction: column;
  #ArticleTextContent {
    flex: 1
  }
}

.base-info {
  .title {
    font-size: 20px;
  }
  margin: 0px 40px;
  .summary {
    color: #999
  }
}

  .wrap-header {
    height: 40px;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }

  .title-contianer{
    height: 24px;
    font-size: 16px;
    color: #161616;
    line-height: 24px;
    font-weight: bold;
    display: flex;
  }

  .form-box {
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-form{
    width: 50%;
  }

  .bottom-btns {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .steps {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 25px;
  }
  .circle {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #396AFF;
    color: #396AFF;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      background: #396AFF;
      color: #fff;
    }
  }

  .line {
    width: 206px;
    height: 1px;
    background: rgba(0,0,0,0.15);
    margin: 0 20px;
  }

  .step {
    display: flex;
  }




  .msg {
    margin-left: 8px;
    font-size: 18px;
    color: #666;
    height: 34px;
    line-height: 34px;
    &.active {
      color: #333;
    }
  }
  .radio-group {
    display: flex;
    width: 880px;
    margin: 65px auto 85px;
    justify-content: space-between;

    .radio-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      .image {
        height: 140px;
        width: 140px;
        margin-bottom: 10px;
      }
    }
  }

  .btn {
    height: 32px;
    line-height: 32px;
    padding:0;
    width: 74px;
    height: 32px;
    margin-bottom: 30px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .custom-tree-node {
    margin-left: 30px;
  }

  .node-btns {
    margin-left: 30px;
  }

</style>
