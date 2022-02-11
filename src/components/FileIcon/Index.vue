<template>
  <div class="container">
    <div class="box" :style="{backgroundColor: bgcolor||'#CBE9FF'}"></div>
    <div class="half-circle" :style="{backgroundColor: bgcolor||'#CBE9FF'}"></div>
    <div class="circle">
      <img :src="require(`./../../assets/img/${type|| 'word'}.svg`)" class="image">
    </div>
  </div>
</template>

<script>
  const bgColorMap = {
    gis: '#DD96F4',
    ppt: '#FFE3DA',
    word: '#CBE9FF',
    wps: '#BDF9C2',
    excel: '#BDF9C2',
    io: '#D0D7FF',
  }
  export default {
    props: ['type'],
    data() {
      return {
       bgcolor: '#fff',
      }
    },

    watch: {
      type(id, oldId){//普通的watch监听
        this.bgcolor = bgColorMap[id]
      },
    },

    mounted() {
      this.bgcolor = bgColorMap[this.type]
    },
  }
</script>
<style lang="scss" scoped>
.container {
  height: 62px; width: 62px; position:relative; margin-left: -20px; margin-top: -20px;
}
.box {
  height: 62px; width: 31px;
}
.half-circle {
  position:absolute; top:0; width: 62px; height: 62px; border-radius: 31px; clip: rect(0px 62px 62px 31px);
}
.circle {
  border-radius: 25px; height: 50px; width: 50px; background-color: #fff; position: absolute; top: 6px; left: 5px
}
.image {
  margin-top: 8px;
  margin-left: 10px;
  width: 30px;
  height: 28px;
}
</style>
