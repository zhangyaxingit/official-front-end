<template>
  <div style="height:100%">
    <!-- <Upload ref="upload" @submitSuccess="submitSuccess"></Upload>
    <div class="dialog-footer">
        <el-button type="primary" @click="submitAddFile" size="small">开始上传</el-button>
    </div> -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="产品轮播" name="product">
        <div class="tab-container-white" >
          <div style="text-align: left">产品轮播图：<el-button  @click="showAddDialog('product')" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >添加</el-button></div>
          <div style="width: 100%;margin-top:20px">
            <draggable
              :list="product"
              item-key="id"
              style="width: 100%; display:flex; flex-wrap: wrap; justify-content: flex-between"
            >
              <template #item="{ element }">
                <div class="list-group-item" style="">
                  <div>{{ element.title }}</div>
                  <div class="lala">
                    <div> <div class="img"></div>{{ element.desc }}</div>
                    <div class="msg">标题: <span>{{element.title}}</span> </div>
                  </div>
                  <div class="bottom-btn">
                    <el-button type="text" class="button" @click="deleteCard(element, 'product')">删除</el-button>
                    <el-button type="text" class="button" @click="editCard(element, 'product')">编辑</el-button>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="解决方案" name="solve">
        <div class="tab-container-white">
          <div style="text-align: left">标题：解决方案<el-button  @click="editTitle" type="text"  style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >编辑</el-button></div>
          <div style="text-align: left">解决方案：<el-button  @click="showAddDialog('solve')" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >新建</el-button></div>
          <div>
            <el-row class="card-container" :gutter="20">
              <el-col :span="6" v-for="(o,index) in solve" :key="index" class="item" >
                <el-card class="box-card">
                  <div class="card-content">
                    <div class="text" >
                      <div class="msg">标题: <span >{{o.title}}</span> </div>
                      <div class="msg">文案: <span >{{o.desc}}</span></div>
                      <div class="msg-img">图片: <img src="./../../assets/img/card-icon.png" alt="" width="38" height="38" class="card-icon"></div>
                    </div>
                    <div class="bottom-btn" v-if="1" >
                      <el-button type="text" class="button" @click="deleteCard(o, 'solve')">删除</el-button>
                      <el-button type="text" class="button" @click="editCard(o, 'solve')">编辑</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新闻咨询" name="news">
        <div class="tab-container-white">
          <div style="text-align: left">标题：新闻资讯<el-button  @click="editTitle" type="text"  style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >编辑</el-button></div>
          <div class="news-contianer">
            <div class="news-content">
              <div class="section-name">企业动态</div>
              <div style="text-align: left">二级标题：企业动态<el-button  @click="editTitle" type="text"  style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >编辑</el-button></div>
              <div class="news-list-container">
                <span>新闻列表：</span>
                <!-- <div class="news-list">
                  <el-button  @click="setNews('company')" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;">设置</el-button>
                  <div >
                    <div v-for="(item, index) in homeNewsList.company" :key="index"><el-button  @click="editTitle" type="text"  style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >{{item.title}}</el-button></div>
                  </div>
                </div> -->
              </div>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="news-content" style="margin-left: 30px">
              <div class="section-name">行业动态</div>
              <div style="text-align: left">二级标题：行业动态<el-button  @click="editTitle" type="text"  style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >编辑</el-button></div>
              <div class="news-list-container">
                <span>新闻列表：</span>
                <!-- <div class="news-list">
                  <el-button  @click="setNews('industry')" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;">设置</el-button>
                  <div >
                    <div v-for="(item, index) in homeNewsList.industry" :key="index"><el-button  @click="editTitle" type="text"  style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >{{item.title}}</el-button></div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合作伙伴" name="partners">
        <div class="tab-container-white">
          <div style="text-align: left">标题：合作伙伴<el-button  @click="editTitle" type="text"  style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >编辑</el-button></div>
          <div style="text-align: left">合作伙伴：<el-button  @click="addParter" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >添加</el-button></div>
          <div>
            <el-row class="card-container" :gutter="20">
              <el-col :span="6" v-for="(o,index) in partner" :key="index" class="item" >
                <el-card class="box-card">
                  <div class="card-content">
                    <!-- <div class="text" >
                      <div class="msg">标题: <span class="blue-bg">{{o.SKU}}</span> </div>
                    </div>
                    <div class="bottom-btn" v-if="1" @click="handleClickCard(o)">
                      <el-button type="text" class="button" >删除</el-button>
                      <el-button type="text" class="button" >编辑</el-button>
                    </div> -->
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-model="formDialogVisible" :title="dialogTitle" @closed="dialogClose">
      <el-form :model="form.product" v-if="activeName === 'product'" :rules="rules.product" ref="ruleFormRef">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.product.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文案" :label-width="formLabelWidth" prop="desc">
          <el-input v-model="form.product.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="背景图片" :label-width="formLabelWidth" prop="imgUrl">
          <el-input v-model="form.product.imgUrl" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form.solve" v-if="activeName === 'solve'" :rules="rules.solve" ref="ruleFormRef1">
        <el-form-item label="标题111" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.solve.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文案2222" :label-width="formLabelWidth">
          <el-input v-model="form.solve.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="formDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensure">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="parterDialogVisible" :title="dialogTitle">
      <el-form :model="form.parter" :rules="rules.parter" ref="ruleFormRef">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.parter.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
          <el-input v-model="form.parter.img" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="parterDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensureParter">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="newsDialogVisible" title="设置首页新闻">
      <!-- <div>{{curNews.choosed}}</div> -->
        <el-select v-model="curNews.choosed" multiple placeholder="Select" collapse-tags multiple-limit="3" style="width: 50%;">
          <el-option
            v-for="item in curNews.list"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newsDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensureNews">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="deleteDialogVisible"
      title="Tips"
      width="30%"
    >
      <span>确定要将 从首页删除？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="ensureDelete"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script lang="ts">
import  { useRouter, useRoute} from 'vue-router'
import  { useStore } from 'vuex'
import type { ElForm } from 'element-plus'
import FileIcon from '../../components/FileIcon/Index.vue'
import Upload from '../../components/Upload/list.vue'
import draggable from 'vuedraggable'

import {defineComponent, onMounted, reactive, ref, computed, watch, toRaw} from 'vue'
  export default defineComponent(
    {
      name: 'list',
      components: {
        FileIcon,
        draggable,
        Upload
      },
      setup(){
        let currentMenu = ref('1')
        let pageSize = ref(24)
        let activeName = ref('product')
        let opType = ref('')
        let formDialogVisible = ref(false)
        let newsDialogVisible = ref(false)
        let deleteDialogVisible = ref(false)
        let parterDialogVisible = ref(false)

        const list = reactive([
          { title: "sdgfdgfdgfgf", id: 0 },
          { title: "dfgsfd", id: 1 },
          { title: "sdfg", id: 2 },
          { title: "fdugdrfh", id: 3 },
          { title: "erhdgf", id: 4 },
          { title: "fgheuyu", id: 6 }
        ])

        
        const ruleFormRef = ref<InstanceType<typeof ElForm>>()
        const ruleFormRef1 = ref<InstanceType<typeof ElForm>>()
        const upload = ref(null)
        const formLabelWidth = '120px'
        let dialogTitle = ref('')
        let homeData = reactive({
          product: [],
          totalData: [],
        })
        let curCard = reactive({
          id: 0,
          type: '',
        })
        let newsType = ref('')
        let curNews = reactive({
          choosed: [],
          list: [],
        } as {
          choosed: any[],
          list: any[],
        })
        const form = reactive({
          product: {
            id: null,
            title: '',
            desc: '',
            imgUrl: ''
          },
          solve: {
            id: null,
            title: '',
            desc: '',
          },
        })
        const rules = reactive({
          product: {
            title: [
              {
                required: true,
                message: '请输入标题',
                trigger: 'blur',
              },
            ],
            desc: [
              {
                required: true,
                message: '请输入文案',
                trigger: 'blur',
              },
            ],
            imgUrl: [
              {
                required: true,
                message: '请输入背景图片',
                trigger: 'blur',
              },
            ]
          },
          solve: {
            title: [
              {
                required: true,
                message: '请输入标题',
                trigger: 'blur',
              },
            ],
            desc: [
              {
                required: true,
                message: '请输入文案',
                trigger: 'blur',
              },
            ]
          }
          
        })

        const router = useRouter()
        const route = useRoute()
        const store = useStore()

        const product = computed(() => store.state.home.product)
        const solve = computed(() => store.state.home.solve)
        const news = computed(() => store.state.home.news)
        const partner = computed(() => store.state.home.partner)
        const curCategory = computed(() => store.state.home.curCategory)
        // const companyNewsList = computed(() => store.state.news.company)
        // const industryNewsList = computed(() => store.state.news.industry)
        // const homeNewsList = reactive({
        //   company: companyNewsList.value.filter((item:any) => news.value.company.includes(item.id)),
        //   industry: industryNewsList.value.filter((item:any) =>  news.value.industry.includes(item.id))
        // })

        watch([activeName, opType], ([newName, newType]) => { //直接监听
          const opText = newType === 'add' ? '添加' : '编辑'
          const nameText = newName === 'product' ? '产品轮播图' : '解决方案'
          dialogTitle.value = `${opText}${nameText}`
        });

        // watch([news, companyNewsList, industryNewsList], ([newVal1, newVal2, newVal3]) => { //直接监听
        //   homeNewsList.company = toRaw(newVal2).filter((item:any) => toRaw(newVal1).company.includes(item.id))
        //   homeNewsList.industry = toRaw(newVal3).filter((item:any) =>  toRaw(newVal1).industry.includes(item.id))
        // });

        watch(() => route.name,() => {
        })

        const showAddDialog = (type: string) =>{
          opType.value = 'add'
           formDialogVisible.value = true
           form[type] = {
            title: '',
            desc: '',
          }
        }

        const editTitle = (item:any) =>{
        }

        const deleteCard = (item:any, type:string) => {
          deleteDialogVisible.value = true
          curCard.id = item.id
          curCard.type = type
        }

        const ensureDelete = (item:any, type:string) => {
          deleteDialogVisible.value = false
          store.commit(`classify/delete`, {
            ...curCard
          })
        }
        
        const addParter = () => {
          parterDialogVisible.value = true
        }

        const editCard = (item:any, type: string) => {
          const {title, desc,id} = item
          opType.value = 'edit'
          formDialogVisible.value = true
          form[type] = {
            id,
            title,
            desc,
          }
        }

        const dialogClose = () =>{
          formDialogVisible.value = true
          form.product = {
            id: null,
            title: '',
            desc: '',
          }
          form.solve = {
            id: null,
            title: '',
            desc: '',
          }
        }

        const setNews = (type: string) => {
          newsDialogVisible.value = true
          newsType.value = type
          // curNews.list = type === 'company' ? companyNewsList.value : industryNewsList.value
          // curNews.choosed = type === 'company' ? news.value.company :  news.value.industry
        }

        const ensure = () =>{
          if (activeName.value === 'product') {
            ruleFormRef.value?.validate((valid: any) => {
              if (valid) {
                validateCb()
              }
            });
          } else {
            ruleFormRef1.value?.validate((valid: any) => {
              if (valid) {
                validateCb()
              }
            });
          }
        }

        const ensureNews = () => {
          newsDialogVisible.value = false
          store.commit(`classify/editNews`, {
            [newsType.value]: curNews.choosed
          })
        }

        const validateCb = () =>{
          formDialogVisible.value = false
          const typeStr = activeName.value.trim().toLowerCase().replace(activeName.value[0], activeName.value[0].toUpperCase());
          if (opType.value === 'add') {
            store.commit(`classify/add${typeStr}`, {
              ...form[activeName.value]
            })
          } else {
            store.commit(`classify/edit${typeStr}`, {
              ...form[activeName.value]
            })
          }
        }

        const submitAddFile = () => {
          // upload.value.submitAddFile()
        }

        const submitSuccess = (url:string) => {
        }


        onMounted(() => {
          currentMenu.value = curCategory.value
          homeData.product = product.value.slice(0, pageSize.value)
          store.dispatch('home/getHome')
        })

        return {
          activeName,
          deleteDialogVisible,
          rules,
          formDialogVisible,
          newsDialogVisible,
          // homeNewsList,
          ruleFormRef,
          list,
          ruleFormRef1,
          product,
          solve,
          formLabelWidth,
          dialogTitle,
          form,
          partner,
          curNews,
          setNews,
          dialogClose,
          ensure,
          addParter,
          showAddDialog,
          upload,
          submitAddFile,
          submitSuccess,
          ensureNews,
          deleteCard,
          editCard,
          editTitle,
          ensureDelete,
        }
      }
    }
  )
  
</script>

<style lang="scss">

.el-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.el-tabs__content {
  overflow: hidden;
  position: relative; 
  flex: 1;
  background: #fff;
}
.el-tab-pane {
  height: 100%;
}

.card-container {
  padding-top: 20px
}
.news-contianer {
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  .news-content {
    flex: 1;
    .section-name {
      margin-bottom: 20px
    }
    .news-list-container {
      display: flex;
      justify-content: start;
      .news-list {
        flex: 1;
        text-align: left;
      }
    }
  }
  .el-divider--vertical {
    height: 100%;
  }
}
.box-card {
  margin-bottom: 20px
}

  .card-content {
    display: flex;
    justify-content: center;
    height: 176px;
    position: relative;
  }

  .bottom-btn {
    position: absolute;
    bottom: -20px;
    left: -20px;
    right: -20px;
    background: #EDF4FF;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    .button {
      color:  #396AFF;
    }
  }
  .text {
    width: calc(100% - 40px);
  }

  .title-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .title {
    font-size: 16px;
    font-weight: 500;
    
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .card-icon {
    margin-right: 10px;
  }

  .msg {
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    margin-top: 4px;
    text-align: left;
    color: #666;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }

  .msg-img{
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    margin-top: 4px;
    text-align: left;
    display: flex;
    align-items: flex-start;
    .card-icon{
      margin-left: 20px;
    }
  }

  .blue-bg {
    margin-left: 8px;
    padding: 0 10px;
      background: #EFF5FF;
    }
  .el-row {
    margin: 0 20px;
  }

  .el-col {
  }

  .search-item {
      display: flex;
      align-items: center;
      .input-title {
        margin-right: 10px;
        width: 70px;
      }
      .input-container {
        flex: 1
      }
  }


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
