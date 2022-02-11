<template>
  <div style="padding: 20px; background: #fff">
    <div class="title">菜单管理</div>

    <div class="block">
      <el-button @click="showAddMenuDialog(0)">新增根菜单</el-button>
      <!-- <div>{{JSON.stringify(curParentId)}}</div> -->

      <el-table :data="menuTree" row-key="id" default-expand-all>
        <el-table-column prop="id" label="id"  />
        <el-table-column prop="name" label="路由name"/>
        <el-table-column prop="path" label="路由path" />
        <el-table-column prop="visible" label="是否隐藏"  />
        <el-table-column prop="parentId" label="父节点"  />
        <el-table-column prop="sort" label="排序"  />
        <el-table-column prop="title" label="菜单名称"  />
        <el-table-column label="操作" width="180" >
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click.prevent="showAddMenuDialog(scope.row.id)"
            >添加子菜单</el-button>
            <el-button
              type="text"
              size="small"
              @click.prevent="showEditMenuDialog(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click.prevent="deleteMenu(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Shipping address" @close="dialogClose">
      <!-- <div>{{selectedParent.value}}</div> -->
      <el-form :model="menuForm">
        <el-form-item label="父节点" >
          <el-cascader
            v-model="selectedParent.value"
            :disabled="parentIdDisabled"
            :props="{label: 'title', value: 'id', checkStrictly: true}"
            :options="menuOptions"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="路由name" >
          <el-input v-model="menuForm.name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="路由path" >
          <el-input v-model="menuForm.path" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏" >
          <el-switch v-model="menuForm.hide"></el-switch>
        </el-form-item>
        <el-form-item label="排序标记" >
          <el-input v-model="menuForm.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" >
          <el-input v-model="menuForm.title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="isEdit ? editMenu() : addMenu()">{{isEdit ? ' 保存' : '添加'}}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import {computed, defineComponent, ref, onMounted, reactive, toRaw} from 'vue'

export default  defineComponent({
  name: 'list',
  setup() {
    let store = useStore()
    let myTree = ref(null as any);
    const roleList = computed(() => store.state.user.roleList)
    const menuTree = computed(() => store.state.user.menuTree)
    const menuOptions = computed(() => store.getters['user/menuOptions'])
    const apiObject = ref({})
    const apiCheckedId = ref([] as number[])
    const nodeChanges = ref([])
    const curRole = ref('')
    const curParentId = ref(0) // 当前父层级为0，也就是默认根菜单
    const curId = ref(0)
    const selectedParent = reactive({
      value: [0]
    })
    const parentIdDisabled = ref(false)
    const isEdit = ref(false)

    let router = useRouter()
    let dialogFormVisible = ref(false)
    let idDisabled = ref(false)

    const menuForm = ref({
      name: '',
      path: '',
      hide: false,
      sort: '',
      title: ''
    })

    const drawer = ref(false)
    const direction = ref('rtl')


    const handleClose = (done:any) => {
      drawer.value = false
      apiCheckedId.value = []
    }

    const gotoManage = (data:any, type:any) => {
      const {userInfo, priInfo, label } = data
      router.push({name: 'userManage', params: {userInfo: JSON.stringify(userInfo), priInfo: JSON.stringify(priInfo), label, type }})
    }

    const showAddMenuDialog = (parnetId: number) => {
      dialogFormVisible.value = !dialogFormVisible.value
      curParentId.value = parnetId
      if(!parnetId) {
        
        selectedParent.value = [0]
      } else {
        selectedParent.value = findPathByLeafId(parnetId, menuOptions.value,undefined)
      }
      parentIdDisabled.value = true
    }

    const showEditMenuDialog = (row: any) => {
      isEdit.value = true
      const rowData = toRaw(row)
      const { parentId, name, path, visible, sort, title, id } = rowData
      dialogFormVisible.value = !dialogFormVisible.value
      curParentId.value = parentId
      curId.value = id
      const arr = findPathByLeafId(parentId, menuOptions.value, undefined)
      selectedParent.value = arr.slice(0, arr.length)
      parentIdDisabled.value = false
      menuForm.value = {
        name: name,
        path: path,
        hide: visible,
        sort: sort,
        title: title
      }
    }

    const addMenu = () => {
      idDisabled.value = false
      dialogFormVisible.value = false
      store.dispatch('user/addMenu', {
        icon: "",
        name: menuForm.value.name,
        parentId: curParentId.value,
        path: menuForm.value.path,
        sort: parseInt(menuForm.value.sort, 10),
        title: menuForm.value.title,
        visible: !menuForm.value.hide,
        cb: () => {
          store.dispatch('user/getMenuTree')
        }
      })
    }


    const editMenu = () => {
      idDisabled.value = false
      dialogFormVisible.value = false
      store.dispatch('user/updateMenu', {
        icon: "",
        name: menuForm.value.name,
        id: curId.value,
        parentId: selectedParent.value.pop(),
        path: menuForm.value.path,
        sort: parseInt(menuForm.value.sort, 10),
        title: menuForm.value.title,
        visible: !menuForm.value.hide,
        cb: () => {
          store.dispatch('user/getMenuTree')
        }
      })
    }

    const deleteMenu = (index: string) => {
      store.dispatch('user/deleteMenu', { id: index, cb: () => {
        store.dispatch('user/getMenuTree')
      }})
    }

    const showEditRoleDrawer = (index: string) => {
      drawer.value = true
      curRole.value = index
      store.dispatch('user/getBindedApis', {roleKey: index})
    }

    const editRole = (row: any) => {
      idDisabled.value = true
      dialogFormVisible.value = true
      // roleForm.value.ID = row.roleKey
      // roleForm.value.name = row.roleName
    }

    const findPathByLeafId = (leafId:any, nodes:any, path:any) => {
      if(path === undefined) {
        path = [];
      }
      for(var i = 0; i < nodes.length; i++) {
          var tmpPath = path.concat();
          tmpPath.push(nodes[i].id);
          if(leafId == nodes[i].id) {
            return tmpPath;
          }
          if(nodes[i].children) {
            let findResult:any = findPathByLeafId(leafId, nodes[i].children, tmpPath);
            if(findResult) {
              return findResult;
            }
          }
      }
    }


    const bindApi = () => {
      const arr = nodeChanges.value.map((item:any) => {
        return {
          method: item.method,
          path: item.path,
        }
      })
      store.dispatch('user/bindApi', {data: {
          roleKey: curRole.value,
          casbinInfos: arr
        },
        cb: () => {
          drawer.value = false
        }
      })
    }


    const dialogClose = () => {
      menuForm.value = {
        name: '',
        path: '',
        hide: false,
        sort: '',
        title: ''
      }
    }

    const handelCheckChange = (aaa:any, bbb:any, ccc:any) => {
      const checkedNodes = JSON.parse(JSON.stringify(myTree.value.getCheckedNodes()))
      nodeChanges.value = checkedNodes
    }

    const handleChange = () => {
      
    }

    onMounted(() => {
      store.dispatch('user/getMenuTree')
    })


    return {
      drawer,
      direction,
      dialogFormVisible,
      menuForm,
      roleList,
      menuTree,
      apiObject,
      apiCheckedId,
      curParentId,
      selectedParent,
      parentIdDisabled,
      myTree,
      isEdit,
      // choosedApiList,
      gotoManage,
      addMenu,
      editMenu,
      showAddMenuDialog,
      showEditMenuDialog,
      idDisabled,
      menuOptions,
      deleteMenu,
      editRole,
      showEditRoleDrawer,
      handleClose,
      bindApi,
      handelCheckChange,
      handleChange,
      dialogClose
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
