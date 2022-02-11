<template>
  <div style="padding: 20px; background: #fff">
    <div class="title">角色管理</div>

    <div class="block">
      <el-button @click="showAddRoleDialog">新增角色</el-button>
      <el-table :data="roleList">
        <el-table-column fixed prop="roleKey" label="角色ID"  />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="admin" label="是否是管理员"  />
        <el-table-column fixed="right" label="操作" >
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click.prevent="showEditRoleDrawer(scope.row.roleKey)"
            >设置权限</el-button>
            <el-button
              type="text"
              size="small"
              @click.prevent="editRole(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click.prevent="deleteRole(scope.row.roleKey)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="roleForm">
        <el-form-item label="角色ID" >
          <el-input v-model="roleForm.ID" autocomplete="off" :disabled="idDisabled"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" >
          <el-input v-model="roleForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addRole">添加</el-button
          >
        </span>
      </template>
    </el-dialog>

      <el-drawer
        v-model="drawer"
        title="角色设置权限"
        :direction="direction"
        :before-close="handleClose"
        :destroy-on-close="true"
      >
        <el-tabs v-model="activeName">
          <el-tab-pane label="api权限" name="first">
            <el-tree
              :data="apiObject"
              show-checkbox
              node-key="id"
              ref="apiTree"
              :default-checked-keys="apiCheckedId"
              @check-change="handelCheckChange"
            />
            <div class="drawer-footer">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="bindApi">添加</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="菜单权限" name="second">
            <el-tree
              :data="menuTree"
              show-checkbox
              node-key="id"
              :props="{label: 'title'}"
              ref="menuTreeRef"
              :default-checked-keys="menuCheckedId"
              @check-change="handelMenuCheckChange"
            />
            <div class="drawer-footer">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="bindMenu">添加</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>



      </el-drawer>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import {computed, defineComponent, ref, onMounted, watch, toRaw} from 'vue'

export default  defineComponent({
  name: 'list',
  setup() {
    let store = useStore()
    let apiTree = ref(null as any);
    let menuTreeRef = ref(null as any);
    const roleList = computed(() => store.state.user.roleList)
    const menuTree = computed(() => store.state.user.menuTree)
    const bindedMenu = computed(() => store.state.user.bindedMenu)
    const apiObject = ref({})
    const menuObject = ref({})
    const apiCheckedId = ref([] as number[])
    const menuCheckedId = ref([] as number[])
    const nodeChanges = ref([])
    const curRole = ref('')
    const activeName = ref('first')

    watch([() => store.getters['user/apiList'], () => store.getters['user/bindedApiList']], ([apiList1, bindedApiList1]) => {
      const bindedApiListArr = JSON.parse(JSON.stringify(bindedApiList1))
      const checkedNodeID:number[] = []
      const apiListArr = JSON.parse(JSON.stringify(apiList1)).map((item:any) => {
        if (!!bindedApiListArr.find((a:any) => a.method === item.method && a.path === item.path)) {
          checkedNodeID.push(item.id)
        }
        return {
          ...item,
          label: item.path
        }
      })

      const apiListObj = apiListArr.reduce((obj:any, b:any) => {
        const apiGroup = b.apiGroup
        if (obj[apiGroup]) {
          obj[apiGroup].push(b)
        } else {
          obj[apiGroup] = [b]
        }
        return obj
      }, {})
      
      
      const apifinalObj = Object.keys(apiListObj).map(item => {
        return {
          id: item,
          label: item,
          children: [...apiListObj[item]]
        }
      })

      apiObject.value = apifinalObj
      apiCheckedId.value = checkedNodeID
    }, {deep: true})

    watch([() => store.getters['user/bindedMenu']], ([bindedMenu1]) => {
      const bindMenuArr = toRaw(bindedMenu1)
      menuCheckedId.value = bindMenuArr
    }, {deep: true})

    let router = useRouter()
    let dialogFormVisible = ref(false)
    let idDisabled = ref(false)

    const roleForm = ref({
      ID: '',
      name: ''
    })

    const drawer = ref(false)
    const direction = ref('rtl')


    const handleClose = () => {
      drawer.value = false
      activeName.value= 'first'
      apiCheckedId.value = []
      menuCheckedId.value = []
    }

    const gotoManage = (data:any, type:any) => {
      const {userInfo, priInfo, label } = data
      router.push({name: 'userManage', params: {userInfo: JSON.stringify(userInfo), priInfo: JSON.stringify(priInfo), label, type }})
    }

    const showAddRoleDialog = () => {
      dialogFormVisible.value = !dialogFormVisible.value
    }

    const addRole = () => {
      dialogFormVisible.value = false
      store.dispatch('user/addRole', {
        roleKey: roleForm.value.ID,
        roleName: roleForm.value.name,
        cb: () => {
          store.dispatch('user/getRoleList')
        }
      })
    }

    const deleteRole = (index: string) => {
      store.dispatch('user/deleteRole', { roleKey: index, cb: () => {
        store.dispatch('user/getRoleList')
      }})
    }

    const showEditRoleDrawer = (index: string) => {
      drawer.value = true
      curRole.value = index
      store.dispatch('user/getBindedApis', {roleKey: index})
      store.dispatch('user/getRoleMenu', {roleKey: index})
    }

    const editRole = (row: any) => {
      idDisabled.value = true
      dialogFormVisible.value = true
      roleForm.value.ID = row.roleKey
      roleForm.value.name = row.roleName
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
          handleClose()
        }
      })
    }

    const bindMenu = () => {
      const arr = nodeChanges.value.map((item:any) => ({
        id: item.id
      }))
      store.dispatch('user/bindMenu', {data: {
          roleKey: curRole.value,
          menus: arr
        },
        cb: () => {
          handleClose()
        }
      })
    }

    

    const handelCheckChange = (aaa:any, bbb:any, ccc:any) => {
      const checkedNodes = JSON.parse(JSON.stringify(apiTree.value.getCheckedNodes()))
      nodeChanges.value = checkedNodes
    }

    const handelMenuCheckChange = (aaa:any, bbb:any, ccc:any) => {
      const checkedNodes = toRaw(menuTreeRef.value.getCheckedNodes())
      nodeChanges.value = checkedNodes
    }

    onMounted(() => {
      store.dispatch('user/getRoleList')
      store.dispatch('user/getApiList')
      store.dispatch('user/getMenuTree')
    })


    return {
      drawer,
      direction,
      dialogFormVisible,
      roleForm,
      roleList,
      apiObject,
      apiCheckedId,
      menuObject,
      menuCheckedId,
      activeName,
      apiTree,
      menuTreeRef,
      menuTree,
      bindedMenu,
      // choosedApiList,
      gotoManage,
      addRole,
      showAddRoleDialog,
      idDisabled,
      deleteRole,
      editRole,
      showEditRoleDrawer,
      handleClose,
      bindApi,
      bindMenu,
      handelCheckChange,
      handelMenuCheckChange,
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
