<template>
  <div style="height: 100%">
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

  .el-menu.el-menu--horizontal {
    border: none;
    margin-bottom: 20px;
    text-align: center;
    background: #FAFBFF;
    .el-menu-item {
      float: none;
      display: inline-block;
      height: 48px;
      line-height: 48px;
    }
  }

</style>
