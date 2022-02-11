<template>
  <div style="overflow-y:auto; height: 100%;">
    <div class="header">
      <img src="./../../assets/img/bg1.png" alt="bg" class="bg">
      <div class="nav-container">
        <div class="icon-container">
          <div class="icon-text">数据中台</div>
        </div>
      </div>
      <div style="height:442px;">
        <!-- <AnimateCard></AnimateCard> -->
      </div>

      <div class="login-box">
        <!-- <div class="slideshow">
            <div class='images'>
              <div class='arrow'></div>
              <div class='arrow'></div>
              <div class='arrow'></div>
              <div class='arrow'></div>
              <div class='arrow'></div>
              <div class='arrow'></div>
              <div class='arrow'></div>
              <div class='arrow'></div>
              <div class='arrow'></div>
            </div>
        </div> -->
        <el-form ref="loginForm" :model="form" label-width="60px" class="login-form">
          <h2 class="login-title">数据中台</h2>
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onLogin">登录</el-button>
            <el-button type="primary" @click="onRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import AnimateCard from './../home1/container/Animate.vue'
import { defineComponent, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'login',
  components:{
    // AnimateCard,
  },
  setup() {
    const form = reactive({
      username: "",
      password: ""
    })
    const router = useRouter()
    const route = useRoute()
    const originUrl:any = route.query

    const store = useStore()
    const onLogin = () => {
      store.dispatch('login/login', {
        username: form.username,
        password: form.password,
        cb: () => {
          originUrl.url.indexOf('login') < 0 ? router.push(originUrl.url) : router.push({name: 'home'})
        }
      })
    }

    const onRegister = () => {
      sessionStorage.setItem('odcUser', JSON.stringify({
        username: form.username,
        password: form.password,
      }))
    }


    return {
      form,
      onLogin,
      onRegister
    }
  }
})
</script>
<style lang="scss" scoped>

  .el-menu-item-group {
    background: rgb(27,38,63) !important;
    padding: 0;
    margin: 0;
  }

  .el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title {
    background: rgb(27,38,63) !important;
    color: #C6C6C6 !important;
  }

  .el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu__title.is-active {
    color: #fff !important;
  }

  .el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu {
    padding: 0;
  }

  .header {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(180deg, #000 0%, #171D32 100%);
    .bg {
      height: 574px;
      width: 1200px;
      height: 504px;
      position: absolute;
      top: 0px;
      left: 410px;
      z-index: 0;
    }


    .login-box{
      // height: 144px;
      flex: 1;
      background: rgb(20,25,43);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99;
      .login-title {
        margin-bottom: 20px;
        text-align: center;
        color: #fff
      }
      .el-form-item__label {
        color: #fff;
      }

      .slideshow { // 窗口
        width: 180px; // 三个元素
        height: 30px;
        position: relative;
        overflow: hidden;
      }
      .images {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 300%; // 共九个元素，是窗口宽度可展示元素的三倍
        display: flex;
        animation: slideshow1 5s linear infinite;
        .arrow {
            width: 50px;
            height: 30px; // 单个元素宽高
            line-height: 30px;
            margin-left: 10px;
            text-align: center;
            display: inline-block;
            background: url('./arrow.png');
            background-size: contain;
          }
      }
      @keyframes slideshow1 {
        0%    { left: -200%; } // 自左向右运动
        100%  { left: 0%; }
      }
    }
  }

</style>


