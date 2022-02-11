<template>
  <div>
    <div class="tab-container">
      <!-- <vqqmap v-model="location" :options="qqmapOptions" ></vqqmap> -->
      <!-- <div class='demo'>
        <VideoPlayer class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions">
        </VideoPlayer>
    </div> -->
      <div>
        <vue3VideoPlay
          v-bind="options"
          poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
        />
      </div>
      <div class="tab-section">
        <div style="display: flex;align-items: center">
          <div>全局顶部导航栏111</div>
           <el-button  @click="showHeaderDialog" type="text" style="margin-left: 20px">编辑</el-button>
        </div>
        <div>
          <div>标题：{{globalHeadr.title || '--'}}</div>
          <div>图标：{{globalHeadr.icon || '--'}}</div>
        </div>
      </div>
      <div class="tab-section">
        <div style="display: flex;align-items: center">
          <div>全局底部footer</div>
           <el-button  @click="showFooterDialog" type="text" style="margin-left: 20px">编辑</el-button>
        </div>
        <div>
          <div>证书：{{globalFooter.cert || '--'}}</div>
          <div>机构地址：{{globalFooter.address || '--'}}</div>
          <div>二维码：{{globalFooter.icon}}</div>
          <div>机构名称：{{globalFooter.instituteName || '--'}}</div>
          <div>版权信息：{{globalFooter.right || '--'}}</div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogHeaderVisible" title="编辑全局顶部导航栏">
      <el-form :model="headerForm">
        <el-form-item label="标题">
          <el-input v-model="headerForm.title" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="headerForm.icon" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogHeaderVisible = false">取消</el-button>
          <el-button type="primary" @click="editHeader">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogFooterVisible" title="编辑全局底部footer">
      <el-form :model="footerForm">
        <el-form-item label="证书">
          <el-input v-model="footerForm.cert" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="机构地址">
          <el-input v-model="footerForm.address" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="footerForm.instituteName" autocomplete="off" ></el-input>
        </el-form-item>
        <div v-for="(dutyItem,index) in footerForm.code" :key="index" style="display: flex;align-items: center">
          <div style="flex: 1">
            <el-form-item :label="index ? '' : '二维码'" :label-width="formLabelWidth"
            :prop="'code.' + index"
            :rules="[
                {required: true, message: '二维码不能为空', trigger: 'blur'}
              ]"
              >
              <el-input v-model="footerForm.code[index]" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div style="width: 100px">
            <el-button @click="deleteInput('code', index)" type="text" v-if="footerForm.code.length > 1 ">删除</el-button>
            <el-button @click="addInput('code')" type="text" v-if="index == footerForm.code.length -1 && footerForm.code.length < 2">增加</el-button>
          </div>
        </div>
        <el-form-item label="版权信息">
          <el-input v-model="footerForm.right" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFooterVisible = false">取消</el-button>
          <el-button type="primary" @click="editFooter">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRoute , useRouter } from 'vue-router'
import vqqmap from 'vue-qqmap'

import {computed, defineComponent, ref, onMounted, reactive, toRaw, watch} from 'vue'
import draggable from 'vuedraggable'

export default  defineComponent({
  name: 'list',
  components: {
    draggable,
    vqqmap,
  },
  setup() {
    let store = useStore()
    let router = useRouter();
    let formLabelWidth = '120px'

    const globalHeadr = computed(() => store.state.global.header)
    const globalFooter = computed(() => store.state.global.footer)
    let dialogHeaderVisible = ref(false)
    let dialogFooterVisible = ref(false)

    let dialogFormVisible = ref(false)
    let idDisabled = ref(false)

    const categoryOptions = ref([
      {label: '类目一', value: 1},
      {label: '类目二', value: 2},
      {label: '类目三', value: 3},
    ])

    const headerForm = ref({
      title: '',
      icon: '',
    })

    const source = ref({
      type: "video/mp4",
      src: 'http://minio-4ij0jd.geo.172.168.80.125.nip.io:32538/geo/14.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20220105%2F%2Fs3%2Faws4_request&X-Amz-Date=20220105T081622Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=24f18fb80a96987ae24415e4602c41f12edf442ce455c35a16cb6f142139ec45'
          
    })

    const source2 = 'https://static.smartisanos.cn/common/video/smartisant1.mp4'

    const playerOptions = ref({
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        autoplay: false,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        sources: [{
            type: "video/mp4",
            src: 'http://minio-4ij0jd.geo.172.168.80.125.nip.io:32538/geo/14.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20220105%2F%2Fs3%2Faws4_request&X-Amz-Date=20220105T081622Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=24f18fb80a96987ae24415e4602c41f12edf442ce455c35a16cb6f142139ec45'
        }],
        poster: '',
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true
        }
    }) 

     const footerForm = ref({
      cert: '',
      address: '',
      instituteName: '',
      code: [''],
      right: ''
    })

    let location = reactive({lat:'30.18531',lng:'120.18344', address:'浙江地质科技创新产业园'})
    let qqmapOptions= reactive({
      key:'2KGBZ-HUOLF-MQ7JK-NZRN6-JHJ32-TNBQX',
      disabledClick:true,
      showHeader: false,
      showFooter: false,
      showBorder: false,
      zoom: 17
    })

    // const mapChange = (data:any) => {
    //   console.log(data)
    // }

    const addInput = (type: string) => {

      footerForm.value = {
          ...footerForm.value,
          [type]: [...footerForm.value[type], '']
        }
      
    }

    const deleteInput = (type: string, index: number) => {
      footerForm.value = {
        ...footerForm.value,
        [type]: footerForm.value[type].filter((item:string, i:number) => i !== index)
      }
    }

    const showHeaderDialog = () => {
     dialogHeaderVisible.value = true
     headerForm.value = globalHeadr.value
    }

    const showFooterDialog = () => {
      dialogFooterVisible.value = true
      footerForm.value = globalFooter.value
    }

    const addDept = () => {
      idDisabled.value = false
      dialogFormVisible.value = false
    }

    const newDialogClose = () => {
      // productForm.value = {
      //   title: '',
      //   type: 0,
      //   summary: '',
      // }
    }



    const editHeader = () => {
      dialogHeaderVisible.value = false
      store.dispatch('global/updateSetting', {
        type: 'header',
        data: headerForm.value
      })
    }

    const editFooter = () => {
      dialogFooterVisible.value = false
      // 还缺表单验证
      store.dispatch('global/updateSetting', {
        type: 'footer',
        data: footerForm.value
      })
    }

    const dialogClose = () => {
    }

    
    onMounted(() => {
      store.dispatch('global/getSetting')
    })


    return {
      dialogFormVisible,
      formLabelWidth,
      location,
      qqmapOptions,
      source,
      source2,
      playerOptions,
      // mapChange,
      addInput,
      deleteInput,
      showHeaderDialog,
      showFooterDialog,
      addDept,
      globalHeadr,
      categoryOptions,
      headerForm,
      footerForm,
      editHeader,
      editFooter,
      dialogClose,
      dialogHeaderVisible,
      dialogFooterVisible,
      newDialogClose,
      globalFooter
    }
  }
})   

</script>
<style lang="scss">

.test-player-wrap {
  width: 720px;
  position: relative;
  margin: 30px auto;
}

.demo{
    display: inline-block;
    width: 600px;
    height: 338px;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }
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
