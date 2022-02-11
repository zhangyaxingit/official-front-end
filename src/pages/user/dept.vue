<template>
  <div style="padding: 20px; background: #fff">
    <div class="tab-container">
        <div style="text-align: left">产品首屏banner：<el-button  @click="showBannerDialog" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;">添加</el-button></div>
        <div style="text-align: left">产品列表：<el-button  @click="showNewDialog" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >新建产品</el-button></div>
        <!-- <div>{{JSON.stringify(product)}}</div> -->
        <div style="width: 100%;margin-top:20px">
            <draggable
              :list="product"
              item-key="id"
              style="width: 100%; display:flex; flex-wrap: wrap; justify-content: flex-between"
            >
              <template #item="{ element }">
                <div class="list-group-item" style="">
                  <div>{{ element.title }}</div>
                  <div class="lala">
                    <div class="msg">类目: <span>{{element.type}}</span> </div>
                    <div class="msg">状态: <span>{{element.status == 1 ? '已发布': '未发布'}}</span> </div>
                    <div>
                      <el-button type="text" class="button" @click="changeStatus(element)" v-if="element.status == 1">撤销发布</el-button>
                      <el-button type="text" class="button" @click="changeStatus(element)" v-if="element.status == 0 && !!element.html">发布</el-button>
                      <el-button type="text" class="button" @click="gotoEditor('edit', element)" v-if="element.status == 0">编辑</el-button>
                      <el-button type="text" class="button" @click="deleteProduct(element)" v-if="element.status == 0">删除</el-button>
                    </div>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
      </div>
    <el-dialog v-model="dialogFormVisible" title="编辑产品首屏banner" @close="dialogClose">
      <el-form :model="deptForm">
        <el-form-item label="标题">
          <el-input v-model="deptForm.name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="图片一">
          <el-input v-model="deptForm.leader" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="图片二">
          <el-input v-model="deptForm.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="isEdit ? editDept() : addDept()">{{isEdit ? ' 保存' : '添加'}}</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="deleteDialogVisible"
      title="删除"
      width="30%"
    >
      <span>确定要将产品删除？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensureDelete"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="newDialogVisible" title="添加产品" @close="newDialogClose">
      <el-form :model="productForm">
        <el-form-item label="产品名称">
          <el-input v-model="productForm.title" autocomplete="off" ></el-input>
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
          <el-input v-model="productForm.leader" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addProduct">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRoute , useRouter } from 'vue-router'

import {computed, defineComponent, ref, onMounted, reactive, toRaw, watch} from 'vue'
import draggable from 'vuedraggable'

export default  defineComponent({
  name: 'list',
  components: {
    draggable
  },
  setup() {
    let store = useStore()
    let router = useRouter();
    const route = useRoute()
    let myTree = ref(null as any);
    const deptOptions = computed(() => store.getters['user/deptOptions'])
    const curParentId = ref(1) // 当前父层级为0，也就是默认根菜单
    const curId = ref(0)

    const product = computed(() => store.state.product.list)
    const selectedParent = reactive({
      value: [0]
    })
    const parentIdDisabled = ref(false)
    let newDialogVisible = ref(false)
    let deleteDialogVisible = ref(false)
    let curProductId = ref(0)
    const isEdit = ref(false)

    const filterText = ref('')


    let dialogFormVisible = ref(false)
    let idDisabled = ref(false)

    const deptForm = ref({
      name: '',
      leader: '',
      email: '',
      phone: ''
    })

    const categoryOptions = ref([
      {label: '类目一', value: 1},
      {label: '类目二', value: 2},
      {label: '类目三', value: 3},
    ])

    const productForm = ref({
      title: '',
      type: 0,
      summary: '',
    })

    watch(filterText, (val) => {
      myTree.value.filter(val)
    })

    

    const showAddDialog = (parentId: number) => {
    }

    const showBannerDialog = (parentId: number) => {
     dialogFormVisible.value = true
    }

    const changeStatus = (item: any) => {
      store.commit(`product/changeStatus`, {
        ...item,
        status: item.status === '1' ? '0' : '1'
      })
    }

    const gotoEditor = (type: string, item: any) => {
      router.push({name: 'userManage', params: {id: item ? item.id : 0, type}})
    }

    const deleteProduct = (item: any) => {
      deleteDialogVisible.value = true
      curProductId.value = item.id
    }

    const ensureDelete = (item: any) => {
      deleteDialogVisible.value = false
      store.commit(`product/deleteProduct`, curProductId.value)
    }

    const addDept = () => {
      idDisabled.value = false
      dialogFormVisible.value = false
    }

    const showNewDialog = () => {
      newDialogVisible.value = true

    }
    const addProduct  = () => {
      newDialogVisible.value = false
      store.commit('product/addProduct', {
        title: productForm.value.title,
        summary: productForm.value.summary,
        type: productForm.value.type,
        status: '0',
        html: ''
      })
    }

    const newDialogClose = () => {
      productForm.value = {
        title: '',
        type: 0,
        summary: '',
      }
    }



    const editDept = () => {
      idDisabled.value = false
      dialogFormVisible.value = false
      store.dispatch('user/updateDept', {
        name: deptForm.value.name,
        id: curId.value,
        parentId: curParentId.value,
        leader: deptForm.value.leader,
        email: deptForm.value.email,
        phone: deptForm.value.phone,
        cb: () => {
          store.dispatch('user/getDeptTree')
        }
      })
    }


    const dialogClose = () => {
      deptForm.value = {
        name: '',
        leader: '',
        email: '',
        phone: ''
      }
    }

    
    onMounted(() => {
      // store.dispatch('user/getDeptTree')
    })



    return {
      dialogFormVisible,
      deptForm,
      showAddDialog,
      showBannerDialog,
      newDialogVisible,
      isEdit,
      addDept,
      addProduct,
      categoryOptions,
      productForm,
      showNewDialog,
      editDept,
      product,
      dialogClose,
      changeStatus,
      gotoEditor,
      deleteProduct,
      deleteDialogVisible,
      ensureDelete,
      newDialogClose
    }
  }
})   

</script>
<style lang="scss">
  .title {
    width: 200px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    font-weight: bold
  }

  .block {
    width: 60%;
    margin: 30px auto;
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
    width: 52px;
    width: 74px;
    height: 32px;
    margin-bottom: 100px;
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

  .custom-tree-a-node{
    margin-left: 20px;
    color: blue;
  }

  .drawer-footer{
    margin-top: 50px
  }

</style>
