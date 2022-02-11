<template>
  <div style="height:100%">
    <el-tabs v-model="bannerType">
      <el-tab-pane label="关于我们" name="about">
        <div class="tab-container">
          <div class="tab-section">
            <div class="section-title">首屏banner<el-button  type="text" @click="showBannerDialog('about')" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >编辑</el-button></div>
            <div>标题：{{about.banner.title || '--'}}</div>
            <div>背景图片：{{about.banner.bgUrl || '--'}}</div>
            <div>前置图片：{{about.banner.imgUrl || '--'}}</div>
          </div>
          
          <div class="tab-section">
            <div class="section-title">公司简介<el-button type="text" @click="showIntroductionDialog" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;">编辑</el-button></div>
            <div>公司名称：{{about.introduction.name || '--'}}</div>
            <div>简介： {{about.introduction.desc || '--'}}</div>
          </div>

          <div class="tab-section">
            <div class="section-title">价值观</div>
            <div>标题：价值观</div>
            <div>列表：<el-button type="text" @click="showValueDialog" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >添加</el-button></div>
            <!-- <div>{{about.values.list}}</div> -->
            <div style="width: 100%; margin-top:20px" v-if="about.values">
              <draggable
                :list="about.values.list"
                item-key="id"
                @end="sortDragList('values')"
                style="width: 100%; display:flex; flex-wrap: wrap; justify-content: flex-between"
              >
                <template #item="{ element }">
                  <div class="list-group-item" style="">
                    <div>{{ element.title }}</div>
                    <div class="lala">
                      <div class="img">{{ element.title }}</div>
                      <div class="img">{{ element.text }}</div>
                      <div class="msg">标题: <span>{{element.img}}</span></div>
                    </div>
                    <div class="bottom-btn">
                      <el-button type="text" class="button" @click="deleteCard(element, 'jobs')">删除</el-button>
                      <el-button type="text" class="button" @click="editCard(element, 'jobs')">编辑</el-button>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
          
          <div class="tab-section">
            <div class="section-title">能力建设</div>
            <div>标题：能力建设</div>
            <div>列表：<el-button type="text" @click="showCertDialog" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >添加</el-button></div>
            <div style="width: 100%; margin-top:20px" v-if="about.credentials">
              <draggable
                :list="about.credentials.list"
                item-key="id"
                @end="sortDragList('credentials')"
                style="width: 100%; display:flex; flex-wrap: wrap; justify-content: flex-between"
              >
                <template #item="{ element }">
                  <div class="list-group-item" style="">
                    <div>{{ element.title }}</div>
                    <div class="lala">
                      <div class="msg"><span>{{element.img}}</span> </div>
                    </div>
                    <div class="bottom-btn">
                      <el-button type="text" class="button" @click="deleteCard(element, 'credentials')">删除</el-button>
                      <el-button type="text" class="button" @click="editCard(element, 'credentials')">编辑</el-button>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>

          <div class="tab-section">
            <div class="section-title">发展历程：<el-button type="text" @click="showHistoryDialog" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >添加</el-button></div>
            <div style="width: 100%; margin-top:20px" v-if="about.history">
              <draggable
                :list="about.history.list"
                item-key="id"
                @end="sortDragList('history')"
                style="width: 100%"
              >
                <template #item="{ element }">
                  <div style="" class="list-group-item-column">
                    <div>{{ element.desc }}</div>
                    <div class="lala">
                      <div class="msg">时间: <span>{{element.date}}</span> </div>
                    </div>
                    <div>
                      <el-button type="text" class="button" @click="deleteCard(element, 'history')">删除</el-button>
                      <el-button type="text" class="button" @click="editCard(element, 'history')">编辑</el-button>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="招贤纳士" name="employ">
        <div class="tab-container">
          <div class="tab-section">
            <div class="section-title">首屏banner<el-button  type="text" @click="showBannerDialog('employ')" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >编辑</el-button></div>
            <div>标题：{{employ.banner.title || '--'}}</div>
            <div>背景图片：{{employ.banner.bgUrl || '--'}}</div>
            <div>前置图片：{{employ.banner.imgUrl || '--'}}</div>
          </div>
        
          <div class="tab-section">
            <div class="section-title">职位列表<el-button  type="text" @click="showJobDialog" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >添加</el-button></div>
            <div style="width: 100%; margin-top:20px">
              <draggable
                :list="employ.jobs"
                item-key="id"
                @end="sortDragList('jobs')"
                style="width: 100%;"
              >
                <template #item="{ element }">
                  <div class="list-group-item-column" style="">
                    <div class="lala">
                      <div class="msg">名称: <span>{{element.name}}</span> </div>
                      <div style="display: flex; ">
                        <div class="msg">职责:</div>
                        <div style="margin-left: 5px">
                          <div class="msg" v-for="(item, index) in element.duty" :key="index" >{{`${index + 1}、${item}`}}</div>
                        </div>
                      </div>
                      <div style="display: flex;">
                        <div class="msg">职责:</div> 
                        <div style="margin-left: 5px">
                          <div class="msg" v-for="(item, index) in element.request" :key="index">{{`${index + 1}、${item}`}}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <el-button type="text" class="button" @click="deleteCard(element, 'jobs')">删除</el-button>
                      <el-button type="text" class="button" @click="editCard(element, 'jobs')">编辑</el-button>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="联系我们" name="contact">
        <div class="tab-container">
          <div class="tab-section">
            <!-- <div>{{contact.banner}}</div> -->
            <div class="section-title">首屏banner<el-button  type="text" @click="showBannerDialog('contact')" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >编辑</el-button></div>
            <div>标题：{{contact.banner.title || '--'}}</div>
            <div>背景图片：{{contact.banner.bgUrl || '--'}}</div>
            <div>前置图片：{{contact.banner.imgUrl || '--'}}</div>
          </div>
          <div class="tab-section">
            <div class="section-title" >联系方式<el-button  type="text" @click="showContactDialog" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;" >编辑</el-button></div>
            <div>电话： 
              <span v-for="(item, index) in contact.details.tel" :key="index" style="margin-right: 10px"> {{item}}</span>
            </div>
            <div>邮箱：
              <span v-for="(item, index) in contact.details.email" :key="index" style="margin-right: 10px"> {{item}}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="formDialogVisible" title="编辑首屏banner" @closed="dialogClose">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="背景图片" :label-width="formLabelWidth" prop="bgUrl">
          <el-input v-model="form.bgUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="前置图片" :label-width="formLabelWidth" prop="imgUrl">
          <el-input v-model="form.imgUrl" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="formDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensure">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="introductionFormDialogVisible" title="编辑公司信息" @closed="dialogClose">
      <el-form :model="introductionForm" :rules="introductionRules" ref="introductionRuleFormRef">
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="introductionForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司简介" :label-width="formLabelWidth" prop="bg">
          <el-input v-model="introductionForm.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="introductionFormDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensureintroduction">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="valueFormDialogVisible" title="新增价值观" @closed="dialogClose">
      <el-form :model="valueForm" :rules="valueRules" ref="valueRuleFormRef">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="valueForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文案" :label-width="formLabelWidth" prop="text">
          <el-input v-model="valueForm.text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
          <el-input v-model="valueForm.img" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="valueFormDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensureValue">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="certFormDialogVisible" title="新增资质" @closed="dialogClose">
      <el-form :model="certForm" :rules="valueRules" ref="certRuleFormRef">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="certForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
          <el-input v-model="certForm.img" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="certFormDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensureCert">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="historyFormDialogVisible" title="新增历史进程" @closed="dialogClose">
      <el-form :model="historyForm" :rules="HistoryRules" ref="historyRuleFormRef">
        <el-form-item label="时间" :label-width="formLabelWidth" prop="title">
          <el-input v-model="historyForm.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文案" :label-width="formLabelWidth" prop="img">
          <el-input v-model="historyForm.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="historyFormDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensureHistory">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="newsDialogVisible" title="设置首页新闻">
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
    <el-dialog v-model="jobFormDialogVisible" title="新增职位" @closed="dialogClose">
      <el-form :model="jobForm" :rules="jobRules" ref="jobRuleFormRef">
        <el-form-item label="职位名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="jobForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <div v-for="(dutyItem,index) in jobForm.duty" :key="index" style="display: flex;align-items: center">
          <div style="flex: 1">
            <el-form-item :label="index ? '' : '职业职责'" :label-width="formLabelWidth"
            :prop="'duty.' + index"
            :rules="[
                {required: true, message: '职业职责不能为空', trigger: 'blur'}
              ]"
              >
              <el-input v-model="jobForm.duty[index]" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div style="width: 100px">
            <el-button @click="deleteInput('duty', index)" type="text">删除</el-button>
            <el-button @click="addInput('duty')" type="text" v-if="index == jobForm.duty.length -1 && jobForm.duty.length < 5">增加</el-button>
          </div>
        </div>
        
        <div v-for="(requestItem,index) in jobForm.request" :key="index" style="display: flex;align-items: center">
          <div style="flex: 1">
            <el-form-item :label="index ? '' : '职业要求'" :label-width="formLabelWidth"
            :prop="'request.' + index"
            :rules="[
                {required: true, message: '职业要求', trigger: 'blur'}
              ]"
              >
              <el-input v-model="jobForm.request[index]" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div style="width: 100px">
            <el-button @click="deleteInput('request', index)" type="text">删除</el-button>
            <el-button @click="addInput('request')" type="text" v-if="index == jobForm.request.length -1 && jobForm.duty.length < 5">增加</el-button>
          </div>
        </div><el-form-item label="投递邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="jobForm.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="jobFormDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensureJob">确认</el-button>
        </span>
      </template>
    </el-dialog>
    
    <el-dialog v-model="contactDialogVisible" title="编辑联系方式" @closed="dialogClose">
      <el-form :model="contactForm" :rules="contactRules" ref="contactRuleFormRef">
        <div v-for="(telItem,index) in contactForm.tel" :key="index" style="display: flex;align-items: center">
          <div style="flex: 1">
            <el-form-item :label="index ? '' : '电话'" :label-width="formLabelWidth"
            :prop="'tel.' + index"
            :rules="[
                {required: true, message: '电话不能为空', trigger: 'blur'}
              ]"
              >
              <el-input v-model="contactForm.tel[index]" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div style="width: 100px">
            <el-button @click="deleteInput('tel', index)" type="text" v-if="contactForm.tel.length >1 ">删除</el-button>
            <el-button @click="addInput('tel')" type="text" v-if="index == contactForm.tel.length -1 && contactForm.tel.length < 3">增加</el-button>
          </div>
        </div>
        
        <div v-for="(emailItem,index) in contactForm.email" :key="index" style="display: flex;align-items: center">
          <div style="flex: 1">
            <el-form-item :label="index ? '' : '邮箱'" :label-width="formLabelWidth"
            :prop="'email.' + index"
            :rules="[
                {required: true, message: '邮箱不能为空', trigger: 'blur'}
              ]"
              >
              <el-input v-model="contactForm.email[index]" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div style="width: 100px">
            <el-button @click="deleteInput('email', index)" type="text" v-if="contactForm.email.length >1 ">删除</el-button>
            <el-button @click="addInput('email')" type="text" v-if="index == contactForm.email.length -1 && contactForm.email.length < 3">增加</el-button>
          </div>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="contactDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensureContact">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="deleteDialogVisible"
      title="Tips"
      width="30%">
      <span>确定要将 删除？</span>
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
import  { useRouter, useRoute } from 'vue-router'
import  { useStore } from 'vuex'
import type { ElForm } from 'element-plus'
import FileIcon from '../../components/FileIcon/Index.vue'
import draggable from 'vuedraggable'

import {defineComponent, onMounted, reactive, ref, computed, watch, toRaw} from 'vue'
  export default defineComponent(
    {
      name: 'list',
      components: {
        FileIcon,
        draggable
      },
      setup(){
        const route = useRoute()
        let currentMenu = ref('1')
        let pageSize = ref(24)
        let bannerType = ref('about')
        let opType = ref('new')
        let formDialogVisible = ref(false)
        let newsDialogVisible = ref(false)
        let deleteDialogVisible = ref(false)
        let introductionFormDialogVisible = ref(false)
        let valueFormDialogVisible = ref(false)
        let certFormDialogVisible = ref(false)
        let historyFormDialogVisible = ref(false)
        let jobFormDialogVisible = ref(false)
        let contactDialogVisible = ref(false)
        

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
        const introductionRuleFormRef = ref<InstanceType<typeof ElForm>>()
        const valueRuleFormRef = ref<InstanceType<typeof ElForm>>()
        const certRuleFormRef = ref<InstanceType<typeof ElForm>>()
        const historyRuleFormRef = ref<InstanceType<typeof ElForm>>()
        const jobRuleFormRef = ref<InstanceType<typeof ElForm>>()
        const contactRuleFormRef = ref<InstanceType<typeof ElForm>>()
        
        const formLabelWidth = '120px'
        let dialogTitle = ref('')
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
        const form = ref({
          title: '',
          bgUrl: '',
          imgUrl: '',
        })

        const introductionForm = ref({
          name: '',
          desc: '',
        })

        const valueForm = ref({
          title: '',
          text: '',
          img: ''
        })

        const certForm = ref({
          title: '',
          img: ''
        })
        const historyForm = ref({
          date: '',
          desc: ''
        })

        const jobForm = ref({
          name: '',
          duty: [''],
          request: [''],
          email: '',
        })

        const contactForm = ref({
          tel: [''],
          email: ['']
        })

        const rules = reactive({
            title: [
              {
                required: true,
                message: '请输入标题',
                trigger: 'blur',
              },
            ],
            bgUrl: [
              {
                required: true,
                message: '请输入背景图片',
                trigger: 'blur',
              },
            ],
            imgUrl: [
              {
                required: true,
                message: '请输入前置图片',
                trigger: 'blur',
              },
            ]
        })

        const introductionRules = reactive({
            name: [
              {
                required: true,
                message: '请输入公司名称',
                trigger: 'blur',
              },
            ],
            desc: [
              {
                required: true,
                message: '请输入公司简介',
                trigger: 'blur',
              },
            ],
        })

        const valueRules = reactive({
            title: [
              {
                required: true,
                message: '请输入标题',
                trigger: 'blur',
              },
            ],
            text: [
              {
                required: true,
                message: '请输入文案',
                trigger: 'blur',
              },
            ],
            img: [
              {
                required: true,
                message: '请输入背景图片',
                trigger: 'blur',
              },
            ],
        })

        const certRules = reactive({
            title: [
              {
                required: true,
                message: '请输入标题',
                trigger: 'blur',
              },
            ],
            img: [
              {
                required: true,
                message: '请输入背景图片',
                trigger: 'blur',
              },
            ],
        })

        const historyRules = reactive({
            date: [
              {
                required: true,
                message: '请输入标题',
                trigger: 'blur',
              },
            ],
            desc: [
              {
                required: true,
                message: '请输入背景图片',
                trigger: 'blur',
              },
            ],
        })

        const jobRules = reactive({
            name: [
              {
                required: true,
                message: '请输入职位职责',
                trigger: 'blur',
              },
            ],
            laal: [
              {
                required: true,
                message: '请输入职位责',
                trigger: 'blur',
              },
            ],
            email: [
              {
                required: true,
                message: '请输入投递邮箱',
                trigger: 'blur',
              },
            ],
        })

        const router = useRouter()
        const store = useStore()

        const about = computed(() => store.state.about.about)
        const employ = computed(() => store.state.about.employ)
        const contact = computed(() => store.state.about.contact)


        // watch([activeName, opType], ([newName, newType]) => { //直接监听
        //     const opText = newType === 'add' ? '添加' : '编辑'
        //     const nameText = newName === 'product' ? '产品轮播图' : '解决方案'
        //     dialogTitle.value = `${opText}${nameText}`
        // });

        // watch(() => route.name,() => {
        //   console.log('监听到变化111111')
        // })
        const showContactDialog = (type: string) =>{
          contactDialogVisible.value = true
          const { tel, email} = contact.value.details
          contactForm.value = {
            tel: tel || [''],
            email: email || ['']
          }
        }
        

        const showBannerDialog = (type: string) =>{
          formDialogVisible.value = true
          const info = type ==='about' ? about : type === 'employ' ? employ : contact
          bannerType.value = type
          form.value = info && info.value ? info.value.banner : {
            title: '',
            bgUrl: '',
            imgUrl: ''
          }
        }

        const showIntroductionDialog = () =>{
          introductionFormDialogVisible.value = true
          introductionForm.value = about && about.value ? about.value.introduction : {
            name: '',
            desc: '',
          }
        }

        const showValueDialog = () =>{
          valueFormDialogVisible.value = true
          opType.value = 'new'
        }

        const showCertDialog = () =>{
          certFormDialogVisible.value = true
          opType.value = 'new'
        }

        const showHistoryDialog = () =>{
          historyFormDialogVisible.value = true
          opType.value = 'new'
        }

        const showJobDialog = () =>{
          jobFormDialogVisible.value = true
        }

        const addInput = (type: string) => {

          if (type === 'tel' || type === 'email') {
            contactForm.value = {
              ...contactForm.value,
              [type]: [...contactForm.value[type], '']
            }
          } else {
            jobForm.value = {
              ...jobForm.value,
              [type]: [...jobForm.value[type], '']
            }
          }
          
        }

        const deleteInput = (type: string, index: number) => {
          if (type === 'tel' || type === 'email') {
            contactForm.value = {
              ...contactForm.value,
              [type]: contactForm.value[type].filter((item, i) => i !== index)
            }
          } else {
            jobForm.value = {
              ...jobForm.value,
              [type]: jobForm.value[type].filter((item, i) => i !== index)
            }
          }
        }

        const editTitle = (item:any) =>{
        }

        const deleteCard = (item:any, type:string) => {
          deleteDialogVisible.value = true
          curCard.id = item.id
          curCard.type = type
        }

        const sortDragList = (type: string) => {
          // console.log(8888888, about.value.values.list)
          if (type === 'jobs') {
            store.dispatch('about/sort', {
              type,
              list: employ.value[type]
            })
          } else {
            store.dispatch('about/sort', {
              type,
              list: about.value[type].list
            })
          }
        }

        const ensureDelete = (item:any, type:string) => {
          deleteDialogVisible.value = false
          store.dispatch('about/deleteItem', curCard)
        }

        const dialogClose = () =>{
          formDialogVisible.value = false
          form.value = {
            title: '',
            bgUrl: '',
            imgUrl: '',
          }
        }

        const ensure = () => {
          ruleFormRef.value?.validate((valid: any) => {
            if (valid) {
              validateCb()
            }
          });
        }

        const ensureintroduction = () =>{
          introductionRuleFormRef.value?.validate((valid: any) => {
            if (valid) {
              validateIntroductionCb()
            }
          });
        }

        const editCard = (item:any, type:string) => {
          opType.value = 'edit'
          if (type === 'values') {
            valueFormDialogVisible.value = true
            valueForm.value = {
              title: item.title,
              text: item.text,
              img: item.img,
            }
          } else if (type === 'credentials') {
            certFormDialogVisible.value = true
            certForm.value = {
              title: item.title,
              img: item.img,
            }
          } else if (type === 'history') {
            historyFormDialogVisible.value = true
            historyForm.value = {
              date: item.date,
              desc: item.desc,
            }
          } else if (type === 'jobs') {
            jobFormDialogVisible.value = true
            jobForm.value = {
              name: item.name,
              duty: item.duty,
              request: item.request,
              email: item.email,
            }
          } 

          curCard.id = item.id
          curCard.type = type
        }

        const ensureValue = () => {
          valueRuleFormRef.value?.validate((valid: any) => {
            if (valid ) {
              valueFormDialogVisible.value = false
              store.dispatch('about/setAbout', {
                type: 'values',
                data:  {
                  ...valueForm.value,
                  id: opType.value === 'new' ? new Date().getTime(): curCard.id
                }
              })
            }
          });
        }

        const ensureCert = () => {
          certRuleFormRef.value?.validate((valid: any) => {
            if (valid) {
              certFormDialogVisible.value = false
              store.dispatch('about/setAbout', {
                type: 'credentials',
                data:  {
                  ...certForm.value,
                  id: opType.value === 'new' ? new Date().getTime(): curCard.id
                }
              })
            }
          });
        }

        const ensureHistory = () => {
          historyRuleFormRef.value?.validate((valid: any) => {
            if (valid) {
              historyFormDialogVisible.value = false
              store.dispatch('about/setAbout', {
                type: 'history',
                data:  {
                  ...historyForm.value,
                  id: opType.value === 'new' ? new Date().getTime(): curCard.id
                }
              })
            }
          });
        }

        const ensureJob = () => {
          jobRuleFormRef.value?.validate((valid: any) => {
            if (valid) {
              jobFormDialogVisible.value = false
              store.dispatch('about/setEmploy', {
                type: 'jobs',
                data: {
                  ...jobForm.value,
                  id: opType.value === 'new' ? new Date().getTime(): curCard.id
                }
              })
            }
          });
        }

        const ensureContact = () => {
          contactRuleFormRef.value?.validate((valid: any) => {
            if (valid) {
              contactDialogVisible.value = false
              // store.commit('about/editContact', {
              //   ...contactForm.value
              // })
              store.dispatch('about/setContact', {
                type: 'detail',
                data: contactForm.value
              })
            }
          });
        }

        const ensureNews = () => {
          newsDialogVisible.value = false
          store.commit(`classify/editNews`, {
            [newsType.value]: curNews.choosed
          })
        }

        const validateCb = () => {
          formDialogVisible.value = false
          const actionName = `about/set${bannerType.value.replace(bannerType.value[0], bannerType.value[0].toUpperCase())}`
          store.dispatch(actionName, {
            type: 'banner',
            data: form.value
          })
        }

        const validateIntroductionCb = () =>{
          introductionFormDialogVisible.value = false
          store.dispatch('about/setAbout', {
            type: 'introduction',
            data: introductionForm.value
          })
          // store.commit('about/editIntroduction', {
          //   ...introductionForm.value
          // })
        }


        onMounted(() => {
          store.dispatch('about/getAbout')
          store.dispatch('about/getContact')
          store.dispatch('about/getEmploy')
        })

        return {
          bannerType,
          deleteDialogVisible,
          introductionForm,
          valueForm,
          certForm,
          historyForm,
          jobForm,
          contactForm,
          introductionFormDialogVisible,
          valueFormDialogVisible,
          certFormDialogVisible,
          historyFormDialogVisible,
          jobFormDialogVisible,
          contactDialogVisible,
          rules,
          opType,
          sortDragList,
          addInput,
          deleteInput,
          introductionRules,
          valueRules,
          certRules,
          historyRules,
          jobRules,
          formDialogVisible,
          newsDialogVisible,
          list,
          ruleFormRef,
          introductionRuleFormRef,
          valueRuleFormRef,
          certRuleFormRef,
          historyRuleFormRef,
          jobRuleFormRef,
          contactRuleFormRef,
          formLabelWidth,
          dialogTitle,
          form,
          curNews,
          about,
          employ,
          contact,
          editCard,
          dialogClose,
          ensure,
          ensureintroduction,
          ensureCert,
          ensureHistory,
          ensureJob,
          showBannerDialog,
          showIntroductionDialog,
          showCertDialog,
          showValueDialog,
          showHistoryDialog,
          showContactDialog,
          showJobDialog,
          ensureNews,
          ensureContact,
          ensureValue,
          deleteCard,
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
