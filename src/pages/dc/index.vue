<template>
  <el-container class="wrap">
    <el-header class="fy_el-header">
      <div class="icon-container" @click="gotoHome">
        <div class="icon-text">数据中台</div>
      </div>
      <div class="message-container">
        <div class="message">
          <i class="el-icon-bell"></i>
          <div class="msg-num">5</div>
        </div>
        <div class="avatar-box">
          <el-dropdown trigger="click">
            <img src="src/assets/img/avatar.png" alt="">
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-container class="my-app-container">
      <el-aside width="200px"
        class="fy_el-aside">
      <el-menu style="height: 100%; background:#333B4B"
        :default-openeds="openedMenus"
        :default-active="activeIndex" @select="handleSelect" background-color="#333B4B" active-text-color="#fff" text-color="#C6C6C6">
        <template v-for="item in userMenuTree" :key="item.id">
          <el-menu-item :index="item.id" v-if="!item.children">
            <img :src="`src/assets/img/${activeIndex === item.id ? `${item.name}-active` : `${item.name}`}.png`"  alt="" class="menu-icon"/>{{item.title}}</el-menu-item>
          <el-sub-menu v-if="!!item.children" :index="item.id">
            <template #title>
              <img :src="`src/assets/img/${item.name}.png`"  alt="" class="menu-icon"/><span>{{item.title}}</span>
            </template>
            <el-menu-item :index="sub.id" v-for="sub in item.children" :key="sub.id">{{sub.title}}</el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-aside>
    <el-main style="background: #F0F2F5; padding: 20px 20px 0">
        <router-view v-slot="{Component}">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
    </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, provide, computed, toRaw } from 'vue'
import { useRoute , useRouter } from 'vue-router'
import { useStore } from 'vuex'
import LoginStore from '@/store/login'
import { clearStore } from '../../store'

export default defineComponent({
  name: 'DC',
  components: {
  },
  setup() {
    const activeIndex = ref(99)
    const openedMenus = ref([] as any[])
    
    const store = useStore()
    const user = computed(() => store.state.login.user)
    const userMenuTree = computed(() => store.state.user.userMenuTree)

    provide('name','我是亚新')

    let router = useRouter();

    const route = useRoute()

    // watch(() => route.name,(val) => {
    //   const curMenu = findNodeByLeafId(val, toRaw(userMenuTree.value), 'name')
    //   activeIndex.value = parseInt(curMenu.id, 10)
    // })

    const findNodeByLeafId = (leafId:any, nodes:any, keyName:string ='id') => {
      for(var i = 0; i < nodes.length; i++) {
          if(leafId == nodes[i][keyName]) {
            return nodes[i];
          }
          if(nodes[i].children) {
            let findResult:any = findNodeByLeafId(leafId, nodes[i].children, keyName);
            if(findResult) {
              return findResult;
            }
          }
      }
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


    const handleSelect = (key: string) => {

      const curMenu = findNodeByLeafId(key, toRaw(userMenuTree.value))
      
      if (curMenu) {
        router.push({name: curMenu.name})
      }
      activeIndex.value = parseInt(key, 10)
    }

    const handleGooperation = () => {
      // message('go to operation')
    }
    const gotoMessageCetner = () => {
      router.push({name: 'message'})
    }
    const gotoHome = () => {
      router.push({name: 'home'})
    }

    const logout = () => {
      store.dispatch('login/logout', {
        cb: () => {
          router.push('login')
          clearStore()
        }
      })
    }

    onMounted(() => {
      const val = route.name

      const curMenu = findNodeByLeafId(val, toRaw(userMenuTree.value), 'name')
      const pathArr = findPathByLeafId(curMenu.id, toRaw(userMenuTree.value), undefined)
      
      setTimeout(() => {
        activeIndex.value = parseInt(curMenu.id, 10)
        if (pathArr.length > 1) {
          const a = [pathArr[pathArr.length -2]]
          openedMenus.value = a
        }
      }, 0)
      // store.dispatch('user/getMenuTreeByUser', {
      //   cb: () => {
      //     const curMenu = findNodeByLeafId(val, toRaw(userMenuTree.value), 'name')
      //     const pathArr = findPathByLeafId(curMenu.id, toRaw(userMenuTree.value), undefined)
          
      //     setTimeout(() => {
      //       activeIndex.value = parseInt(curMenu.id, 10)
      //       if (pathArr.length > 1) {
      //         const a = [pathArr[pathArr.length -2]]
      //         console.log('hfgdjfghfjkh', curMenu, a)
      //         openedMenus.value = a
      //       }
      //     }, 0)
      //   }
      // })

    })

    return {
      activeIndex,
      openedMenus,
      handleSelect,
      userMenuTree,
      handleGooperation,
      gotoMessageCetner, 
      logout,
      gotoHome
    }
  }
})


</script>
<style lang="scss">




.wrap {
    height: 100%;
    // background-color: red;
    display: flex;
    flex-direction: column;

    .fy_el-header {
      background: #001932;
      color: #fff;
      z-index: 1000;
      font-size: 14px;
      line-height: 60px;
      height: 60px;
      padding-left: 5px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .icon-container{
        display: flex;
        align-items: center;
        margin-left: 15px;
        .img {
          height: 30px;
          margin-right: 10px;
        }

        .icon-text {
          color:#fff;
          font-size: 20px;
          font-weight: 500;
        }
      }
      .el-dropdown{
        float: right;
        height: 70px;
        line-height: 70px;
        .el-dropdown-link {
          color: #fff;
        }
      }
    }

    .my-app-container {
      overflow: auto;
      flex: 1
    }
  }

.el-menu {
  border: none
}

.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
}

.message-container {
  display: flex;
  align-items: center;
  i {
    font-size: 20px;
    margin-right: 30px;
  }

  .message {
    position: relative;
  }

  .msg-num {
    position: absolute;
    top: 8px;
    left: 10px;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    border: 2px solid #fff;
    background-color: #FF4D4F;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;

  }

  .avatar-box {
    display: flex;
    align-items: center;
    margin-right: 20px;
    img {
      margin-right: 10px;
      width: 30px;
      border-radius: 15px;
    }
  }
}

.user-container {
  margin-right: 32px;
  i {
    margin-right: 10px;
  }
}

.el-aside {
  .el-menu-item.is-active { background-color: #1E2941 !important; }
  .el-sub-menu .el-menu-item {
    padding: 0 20px
  }
}



</style>
