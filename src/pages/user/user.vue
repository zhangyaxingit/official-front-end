<template>
  <div style="padding: 20px; background: #fff">
    <div class="title">用户管理</div>
<!-- <div>{{JSON.stringify(roleList)}}</div> -->
    <div class="block">
      <el-button @click="showAddRoleDialog">新增用户</el-button>
      <el-table :data="userList">
        <el-table-column fixed prop="avater" label="头像"  />
        <el-table-column prop="id" label="UUID" />
        <el-table-column prop="username" label="用户名"  />
        <el-table-column prop="nickName" label="昵称"  />
        <el-table-column prop="roleKey" label="用户角色"  />
        <el-table-column fixed="right" label="操作" >
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click.prevent="editUser(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click.prevent="deleteUser(scope.row.roleKey)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="roleForm">
        <el-form-item label="用户名" >
          <el-input v-model="roleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="roleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="roleKey" >
          <el-select v-model="roleForm.roleKey" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.roleKey"
              :label="item.roleName"
              :value="item.roleKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addUser">添加</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import {computed, defineComponent, ref, onMounted, watch} from 'vue'
import { IRole, IUserData } from '../../store/user'

export default  defineComponent({
  name: 'list',
  setup() {
    let store = useStore()
    const userList = computed(() => store.state.user.userList)
    const roleList = computed(() => store.state.user.roleList.map((item: IRole) => {
      return {
        roleKey: item.roleKey,
        roleName: item.roleName,
      }
    }))
    const curUser = ref('')

    let router = useRouter()
    let dialogFormVisible = ref(false)
    let idDisabled = ref(false)

    const roleForm = ref({
      username: '',
      password: '',
      roleKey: ''
    })

    const showAddRoleDialog = () => {
      dialogFormVisible.value = !dialogFormVisible.value
    }

    const addUser = () => {
      dialogFormVisible.value = false
      store.dispatch('user/addUser', {
        roleKey: roleForm.value.roleKey,
        username: roleForm.value.username,
        password: roleForm.value.password,
        cb: () => {
          store.dispatch('user/getUserList')
        }
      })
    }

    const deleteUser = (index: string) => {
      store.dispatch('user/deleteUser', { roleKey: index, cb: () => {
        store.dispatch('user/getUserList')
      }})
    }

    const editUser = (row: IUserData) => {
      idDisabled.value = true
      dialogFormVisible.value = true
      // roleForm.value.ID = row.roleKey
      // roleForm.value.name = row.roleName
    }


    onMounted(() => {
      store.dispatch('user/getRoleList')
      store.dispatch('user/getUserList')
    })


    return {
      dialogFormVisible,
      roleForm,
      userList,
      roleList,
      addUser,
      showAddRoleDialog,
      idDisabled,
      deleteUser,
      editUser,
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
