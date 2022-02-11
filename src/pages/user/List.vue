<template>
  <div style="padding: 20px; background: #fff">
    <div class="title">账户管理</div>
      <div class="block">
        <el-tree
          :data="groupList"
          node-key="id"
          :default-expanded-keys="[1, 7]"
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import {computed, defineComponent} from 'vue'


export default  defineComponent({
  name: 'list',
  setup() {
    let store = useStore()
    const groupList = computed(() => store.state.user.groupList)
    let router = useRouter()

    const gotoManage = (data:any, type:any) => {
      const {userInfo, priInfo, label } = data
      router.push({name: 'userManage', params: {userInfo: JSON.stringify(userInfo), priInfo: JSON.stringify(priInfo), label, type }})
    }

    const submitForm = () => {
      // this.$refs['elForm'].validate(valid => {
      //   if (!valid) return
      // })
    }

    const resetForm = () => {
      // this.$refs['elForm'].resetFields()
    }

    const renderContent = (h:any, {node, data}: {node: any, data: any}) => {
      if (!!data.children) {
        return h(
          'span',
          {
            class: 'custom-tree-node',
          },
          h('span', null, node.label),
        )
      } else {
        return h(
          'span',
          {
            class: 'custom-tree-node',
          },
          h('span', null, node.label),
          h(
            'span',
            null,
            h(
              'a',
              {
                class: 'custom-tree-a-node',
                onClick: () => gotoManage(data, 'manageOrg'),
              },
              '组织管理 '
            ),
            h(
              'a',
              {
                class: 'custom-tree-a-node',
                onClick: () => gotoManage(data, 'managePri'),  
              },
              '权限管理'
            )
          )
        )
      }
    }

    return {
      groupList,
      gotoManage,
      renderContent,
      submitForm,
      resetForm
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

</style>
