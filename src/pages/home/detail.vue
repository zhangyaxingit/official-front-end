<template>
  <div class="bg">
    <div style="background: #fff; padding: 20px" v-if="dataInfo">
      <div class="wrap-header">
      <div>
        <el-button type="text" @click="goBack" class="btn" icon="el-icon-arrow-left">返回</el-button>
      </div>
      <!-- <div>
        <el-button @click="showDialogForm" class="btn">申请调用</el-button>
        <el-button @click="dialogErrorFormVisible = true" class="btn">错误反馈</el-button>
        <el-button type="primary" class="btn" v-if="curCategory > 0">下载</el-button>
      </div> -->
      <div class="title-contianer">
        <div class="title">{{dataInfo.data.name}}</div>
        <!-- <img :src="require(`./../../assets/img/${dataInfo.format === '接口文件'? 'io':dataInfo.format}.svg`)" class="image"> -->
      </div>
    </div>
    <el-row class="content" v-if="dataInfo.data">
      <el-col :span="12"><div class="msg">SKU: {{dataInfo.data.SKU}}</div></el-col>
      <el-col :span="12"><div class="msg">总量（条）: {{dataInfo.data.num}}</div></el-col>
      <el-col :span="12"><div class="msg">所属地区: {{dataInfo.data.area}}</div></el-col>
      <el-col :span="12"><div class="msg">领域分类: {{dataInfo.data.type}}</div></el-col>
    </el-row>
    </div>

    <div style="background: #fff; margin-top: 20px; padding: 20px 40px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="数据项" name="first" v-if="dataInfo">
          <el-table :data="api.returnParams" :header-cell-style="{color: '#333', background: 'rgba(0,0,0,0.02)'}">
            <el-table-column
              prop="name"
              label="参数名">
            </el-table-column>
            <el-table-column
              prop="type"
              label="字段类型">
            </el-table-column>
            <el-table-column
              prop="isNull"
              label="是否为空">
            </el-table-column>
            <el-table-column
              prop="isAdd"
              label="是否自增">
            </el-table-column>
            <el-table-column
              prop="key"
              label="键">
            </el-table-column>
            <el-table-column
              prop="other"
              label="额外的">
            </el-table-column>
            <el-table-column
              prop="expression"
              label="Expression">
            </el-table-column>
            <el-table-column
              prop="sheng"
              label="是否缺省">
            </el-table-column>
            <el-table-column
              prop="tip"
              label="备注">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="background: #fff; margin-top: 20px; padding: 20px 40px; padding-bottom: 50px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="数据示例" name="first" v-if="dataInfo">
          <el-table :data="example" :header-cell-style="{color: '#333', background: 'rgba(0,0,0,0.02)'}">
              <el-table-column
                prop="GLID"
                label="GLID">
              </el-table-column>
              <el-table-column
                prop="YHDID"
                label="YHDID">
              </el-table-column>
              <el-table-column
                prop="YHDNAME"
                label="YHDNAME">
              </el-table-column>
              <el-table-column
                prop="PRJ_NO"
                label="PRJ_NO">
              </el-table-column>
              <el-table-column
                prop="PRJ_NAME"
                label="PRJ_NAME">
              </el-table-column>
              <el-table-column
                prop="SFSB"
                label="SFSB">
              </el-table-column>
              <el-table-column
                prop="BHHS"
                label="BHHS">
              </el-table-column>
              <el-table-column
                prop="BHRS"
                label="BHRS">
              </el-table-column>
              <el-table-column
                prop="THREATHOUSE"
                label="THREATHOUSE">
              </el-table-column>
              <el-table-column
                prop="HOUSERPERSON"
                label="HOUSERPERSON">
              </el-table-column>
              <el-table-column
                prop="prj_status"
                label="prj_status">
              </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>



    <el-dialog title="数据调用申请" :visible="dialogFormVisible" width="700px">
      <div class="el-dialog-div">
        <el-form :model="ruleForm.data" :rules="rules" ref="ruleForm" label-width="170px">
          <el-form-item label="申请人" >
            <el-input v-model="ruleForm.name" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请单位名称" >
            <el-input v-model="ruleForm.title" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请人电话" >
            <el-input v-model="ruleForm.title" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="负责人" >
            <el-input v-model="ruleForm.responsible" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话" >
            <el-input v-model="ruleForm.responsibleTel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请依据" prop="summary">
            <el-input v-model="ruleForm.summary" type="textarea" placeholder="请输入数据摘要"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="安全管理制度" prop="summary">
            <el-input v-model="ruleForm.summary" type="textarea" placeholder="请输入数据摘要"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="安全管理制度附件上传" prop="annex" required>
            <el-upload ref="annex"  action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="small" icon="el-icon-upload">选择文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="应用场景" >
            <el-input v-model="ruleForm.appScene" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="应用名称" >
            <el-input v-model="ruleForm.appName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="应用部署层级" prop="level">
            <el-select v-model="ruleForm.level" placeholder="请选择数据格式" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in levelOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用系统IP" >
            <el-input v-model="ruleForm.ip" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="接口日均调用量" >
            <el-input v-model="ruleForm.num" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="安全责任人" >
            <el-input v-model="ruleForm.saveResponsible" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="安全分管领导" >
            <el-input v-model="ruleForm.saveLeader" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="附件" prop="annex" required>
            <el-upload ref="annex" action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="small" icon="el-icon-upload">选择文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注" prop="summary">
            <el-input v-model="ruleForm.summary" type="textarea" placeholder="请输入数据摘要"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交申请</el-button>
        </div>
      </div>

    </el-dialog>
    <el-dialog title="错误反馈" :visible="dialogErrorFormVisible" width="500px">
      <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px"  >
        <el-form-item label="错误类型" prop="type">
          <el-select v-model="ruleForm1.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="具体说明" prop="desc">
          <el-input v-model="ruleForm1.desc"></el-input>
        </el-form-item>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogErrorFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormError('ruleForm1')">提交反馈</el-button>
      </div> -->
    </el-dialog>

  </div>

</template>

<script lang="ts">
import apiData from '../../data/api.json'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { defineComponent, reactive, ref, computed, onMounted } from 'vue'

export default defineComponent({
  name: 'detail',
  setup() {
    let activeName = ref('first')
    let dialogFormVisible = ref(false)
    let dialogErrorFormVisible = ref(false)
    let forms = reactive({
      form: {
        name: '',
        title: '',
        createTime: '',
        reason: ''
      },
      ruleForm1: {
        type: '',
        desc: ''
      },
    })
    let dataInfo = reactive({
      data: {}
    })
    let ruleForm = reactive({
      data: {
        name: '',
        title: '',
        createTime: '',
        reason: ''
      }
    })
    const levelOptions = [
      {"label": "国家","value": 1},
      {"label": "省级","value": 2},
      {"label": "市级","value": 3},
      {"label": "县（市、区）级","value": 4},
      {"label": "无系统","value": 5},
    ]
    const options = [
      {value: 1, label: '错误类型1'},
      {value: 2, label: '错误类型2'},
      {value: 3, label: '错误类型3'},
      {value: 4, label: '错误类型4'},
    ]

    const rules = {
      createTime: [
        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      ],
      reason: [
        { required: true, message: '请输入申请原因', trigger: 'blur' },
      ],
    }
    const rules1 = {
      type: [
        { required: true, message: '请选择错误类型', trigger: 'change' }
      ],
      desc: [
        { required: true, message: '请输入问题概述', trigger: 'blur' },
      ],
    }
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const list = computed(() => store.state.classify.list)
    const curCategory = computed(() => store.state.classify.curCategory)
    const pindex = computed(() => store.state.classify.pindex)
    const example = computed(() => store.state.classify.example)

    onMounted(() => {
      const curClassify = list.value[`list${curCategory.value}`]
      const curData = curClassify.find((item:any) => item.id === pindex.value)

      if(!curData) {
        
        dataInfo.data = route.params.value
      } else {
        dataInfo.data = curData
      }
      ruleForm.data = {
        name: '管理员',
        title: curData ? curData.title: '',
        createTime: '',
        reason: ""
      }
    })

    const goBack = () => {
      router.back()
    }

    const showDialogForm = () => {
      dialogFormVisible.value = true
    }

    const submitForm = (formName:string) => {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$message({
      //       message: '提交成功',
      //       type: 'success'
      //     });
      //     this.dialogFormVisible = false
      //   } else {
      //     return false;
      //   }
      // });
    }

    const submitFormError = (formName:string) =>{
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$message({
      //       message: '提交成功',
      //       type: 'success'
      //     });
      //     this.dialogErrorFormVisible = false
      //   } else {
      //     return false;
      //   }
      // });
    }

    const cancel = () => {
      dialogFormVisible.value = false
      ruleForm.data = {
        name: '管理员',
        // title: dataInfo.data.title,
        title: '',
        createTime: '',
        reason: ""
      }
    }
    const cancelError = () => {
      dialogErrorFormVisible.value = false
      // ruleForm1.data = {
      //   type: '',
      //   desc: '',
      // }
    }

    return {
      activeName,
      dialogFormVisible,
      dialogErrorFormVisible,
      forms,
      dataInfo,
      api: apiData,
      levelOptions,
      options,
      rules,
      rules1,
      example,
      cancel,
      cancelError,
      submitFormError,
      submitForm,
      showDialogForm,
      goBack,
    }
  }
})

</script>

<style lang="scss" scoped>

    .el-dialog-div {
      height: 600px;
      align-items: center;
      overflow: auto;
      .dialog-footer {
        display: flex;
        justify-content: center;
      }
    }
    .el-dialog-div::-webkit-scrollbar { width: 0 !important }

  .msg {
    font-size: 14px;
    margin: 5px 0
  }

  .icon {
    background: #f8f8f8;
    height: 100px;
    margin-right: 40px
  }


  .bg{
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .btn {
    height: 32px;
    line-height: 32px;
    padding:0 12px;
    margin-top: -10px;
  }

  .title-contianer{
    top: 16px;
    left: 96px;
    height: 24px;
    font-size: 16px;
    color: #161616;
    line-height: 24px;
    width: 50%;
    font-weight: bold;
    position: absolute;
    display: flex;
  }

  .title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .image {
    height: 28px;
    width: 28px;
    margin-left: 12px;
  }

  .wrap-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    position: relative;
  }

  .line {
    margin-bottom: 8px;
  }

  .text {
    height: 22px;
    font-size: 14px;
    color: #333333;
    line-height: 22px;
  }

  .msg {
    margin-left: 96px;
    margin-right: 2px;

  }

  .text-msg {
    font-size: 14px;
    line-height: 30px;
    height: 30px;
    margin-left: 0px;
    margin-right: 2px;
  }

  .value {
    margin-left: 6px;
  }

  .content {
    margin-top: 40px
  }

  .el-divider--horizontal {
    margin-top: 16px;
  }

  .reference {
    margin-left: 96px;
  }

  .reference-line {
    height: 22px;
    font-size: 14px;
    color: #333333;
    line-height: 22px;
    margin-bottom: 6px;
  }

  .level0 {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .level1 {
    height: 24px;
    line-height: 24px;
    padding-left: 10px;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .title-wraper {
    display:flex;
    align-items:center;
    margin-bottom: 12px;
      .title-icon {
        height: 14px; width: 4px;border-radius: 2px; background:#396AFF; display: inline-block; margin-right: 10px;
      }
      .title-text {
        height: 24px; line-height: 24px; font-weight: bold
      }

  }

  .section {
    margin-top: 16px;
  }

  .hl-pre {
    font-size: 12px!important;
    margin: 0!important;
    position: relative;
    margin-top: -10px !important;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    color: #383a42;
    background: rgba(0,0,0,0.02);
  }
  .code-type {
    width: 91px;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-top: 8px;
    background: #EFF5FF;
    border-radius: 4px;
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    text-align: center;
  }
  .api-section {
    padding-bottom: 40px;
  }
</style>
