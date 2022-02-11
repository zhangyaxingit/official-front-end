<template>
  <div class="product-container">
    <div class="wrap-header">
      <div class="title-contianer">
        <el-button type="text" @click="goBack" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
    <div class="base-info">
      <h4>{{curProduct.title}}</h4>
      <p class="summary">{{curProduct.summary || '-'}}</p>
      <p class="product-type">所属类目： {{curProduct.type}}</p>
    </div>
    <el-divider></el-divider>
    <!-- <div>{{curProduct}}</div> -->
    <div id="ArticleTextContent">
      <TextEditor :txt="curProduct.html"/>
    </div>
      <el-dialog title="修改历史" v-model="manageOrgShow">
        <el-table :data="orgHistory">
          <el-table-column property="name" label="修改人" width="200"></el-table-column>
          <el-table-column property="date" label="修改时间" width="150"></el-table-column>
          <el-table-column property="address" label="修改内容"></el-table-column>
        </el-table>
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
import StatusBtn from './StautsBtn.vue'
import { defineComponent, reactive, ref, onMounted, computed } from 'vue'
import TextEditor from "../../components/TextEditor/Index.vue";
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'manage',
  components: { StatusBtn, TextEditor },
  setup() {
    let type = ref('manageOrg')
    let manageOrgShow =ref(false)
    let managePriShow =ref(false)
    let dialogFormVisible =ref(false)
    let content = ref('')
    let opType = ref('new')
    let store = useStore()
    const product = computed(() => store.state.product.list)

    let router = useRouter()
    let route = useRoute()
    let curProduct = ref({
      id: 0,
      title: '',
      summary: '',
      status: '',
      type: ''
    })

    
    
    let form = reactive({
      data: {
        institution: '',
        leader: '',
        responsible: '',
        contact: '',
        email: ''
      }
    })

    let tableData = reactive({ arr: [] } as { arr: any[]})

    let right = ref('')

    onMounted(() => {
      const {id, type} = route.params
      opType.value = `${type}`
      curProduct.value = product.value.find((item:any) => item.id == id)
      
      
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
    const showHistory = () => {
      type.value === 'manageOrg' ? manageOrgShow.value = true : managePriShow.value = true
    }

    const toggleDialog = () => {
      dialogFormVisible.value = !!dialogFormVisible
    }
    
    return {
      form,
      curProduct,
      manageOrgShow,
      managePriShow,
      dialogFormVisible,
      content,
      right,
      goBack,
      ensure,
      toggleDialog
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
