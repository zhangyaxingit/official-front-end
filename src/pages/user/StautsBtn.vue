<template>
  <div style="display: flex">
    <div :class="{grayBg: right[0] ===1, greenBg: right[0] !==1, btnBg:true}">{{ ['', '可查看', '不可查看'][right[0]]}}</div>
    <div :class="{grayBg: right[1] ===3, blueBG: right[1] ===1, yellowBG: right[1] ===2, btnBg: true}">{{ ['', '可调用', '审批中', '不可调用'][right[1]]}}</div>
  </div>
</template>

<script lang="ts">
import {inject, defineComponent } from 'vue'
  export default defineComponent({
    name:'statusBtn',
    props: {
      right: {
          type: Array
      }
    },
    setup(props) {
      const name =  inject('name')
      // console.log('inject收到了吗', name)
      return {
        right: props.right as any[]
      }
    }
  })
</script>

<style lang="scss" scoped>
.grayBg {
  width: 72px;
  height: 24px;
  background: #F6F6F6;
  border: 1px solid #BBBBBB;
  border-radius: 4px;
  color: #BBBBBB;
}

.greenBg {
  width: 72px;
  height: 24px;
  background: #F6FFED;
  border: 1px solid #B7EB8F;
  border-radius: 4px;
  color: #52C41A
}

.blueBG {
  width: 72px;
  height: 24px;
  background: #EFF5FF;
  border: 1px solid #ADCDFF;
  border-radius: 4px;
  color: #396AFF ;
}

.yellowBG {
  width: 72px;
  height: 24px;
  background: #FFFBE6;
  border: 1px solid #FFE58F;
  border-radius: 4px;
  color: #FAAD14 ;
}

.btnBg {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btnBg:last-child {
  margin-left: 10px;
}

</style>
