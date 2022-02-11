<template>
  <div class="tab-container">
    <div class="tab-section">
      <div class="section-title">
        首屏banner<el-button
          type="text"
          @click="showBannerDialog"
          style="margin-left: 10px; padding-right: 8px; padding-left: 8px"
          >编辑</el-button
        >
      </div>
      <div>标题：{{news.banner.title || '--'}}</div>
      <div>背景图片：{{news.banner.bgUrl || '--'}}</div>
      <div>前置图片：{{news.banner.imgUrl || '--'}}</div>
    </div>

    <div class="tab-section">
      <div style="text-align: left">
        新闻列表：<el-button
          @click="showNewDialog"
          style="margin-left: 10px; padding-right: 8px; padding-left: 8px"
          >新建新闻</el-button
        >
      </div>
      <!-- <div>{{JSON.stringify(news)}}</div> -->
      <div style="width: 100%; margin-top: 20px">
        <draggable
          :list="news.list"
          item-key="id"
          style="
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-between;
          "
        >
          <template #item="{ element }">
            <div class="list-group-item" style="">
              <div>{{ element.title }}</div>
              <div class="lala">
                <div class="msg">
                  类目: <span>{{ element.type }}</span>
                </div>
                <div class="msg">
                  状态:
                  <span>{{ element.status == 1 ? "已发布" : "未发布" }}</span>
                </div>
                <div>
                  <el-button
                    type="text"
                    class="button"
                    @click="changeStatus(element)"
                    v-if="element.status == 1"
                    >撤销发布</el-button
                  >
                  <el-button
                    type="text"
                    class="button"
                    @click="changeStatus(element)"
                    v-if="element.status == 0 && !!element.html"
                    >发布</el-button
                  >
                  <el-button
                    type="text"
                    class="button"
                    @click="gotoEditor('edit', element)"
                    v-if="element.status == 0"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    class="button"
                    @click="deleteNews(element)"
                    v-if="element.status == 0"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <el-dialog
      v-model="dialogFormVisible"
      title="编辑新闻首屏banner"
      @close="dialogClose"
    >
      <el-form :model="bannerForm">
        <el-form-item label="标题">
          <el-input v-model="bannerForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="背景图片">
          <el-input v-model="bannerForm.bgUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="前置图片">
          <el-input v-model="bannerForm.imgUrl" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editBanner">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="deleteDialogVisible" title="删除" width="30%">
      <span>确定要将新闻删除？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensureDelete">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="newDialogVisible"
      title="添加新闻"
      @close="newDialogClose"
    >
      <el-form :model="NewsForm">
        <el-form-item label="新闻标题">
          <el-input v-model="NewsForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="新闻所属类目">
          <el-select v-model="NewsForm.type" placeholder="请选择">
            <el-option
              v-for="item in categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="概述">
          <el-input v-model="NewsForm.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addNews">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import {
  computed,
  defineComponent,
  ref,
  onMounted,
  reactive,
  toRaw,
  watch,
} from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  name: "list",
  components: {
    draggable,
  },
  setup() {
    let store = useStore();
    let router = useRouter();
    const route = useRoute();
    let myTree = ref(null as any);

    const news = computed(() => store.state.news);
    let newDialogVisible = ref(false);
    let deleteDialogVisible = ref(false);
    let curNewsId = ref(0);
    const isEdit = ref(false);

    const filterText = ref("");

    let dialogFormVisible = ref(false);
    let idDisabled = ref(false);

    const bannerForm = ref({
      title: "",
      imgUrl: "",
      bgUrl: "",
    });

    const categoryOptions = ref([
      { label: "行业咨询", value: 1 },
      { label: "公司新闻", value: 2 },
    ]);

    const NewsForm = ref({
      title: "",
      type: 0,
      desc: "",
    });

    watch(filterText, (val) => {
      myTree.value.filter(val);
    });

    const showAddDialog = (parentId: number) => {
    };

    const showBannerDialog = (parentId: number) => {
      dialogFormVisible.value = true;
      const { banner } = news.value
      bannerForm.value = banner || {
        title: '',
        imgUrl: '',
        bgUrl: ''
      }
    };

    const changeStatus = (item: any) => {
      store.dispatch(`news/updateNews`, {
        data: {
          ...item,
          status: item.status === "1" ? "0" : "1",
        }
      });
    };

    const gotoEditor = (type: string, item: any) => {
      router.push({
        name: "newsDetail",
        params: { id: item ? item.id : 0, type },
      });
    };

    const deleteNews = (item: any) => {
      deleteDialogVisible.value = true;
      curNewsId.value = item.id;
    };

    const ensureDelete = (item: any) => {
      deleteDialogVisible.value = false;
      store.dispatch(`news/deleteNews`, curNewsId.value);
    };

    const addDept = () => {
      idDisabled.value = false;
      dialogFormVisible.value = false;
    };

    const showNewDialog = () => {
      newDialogVisible.value = true;
    };
    const addNews = () => {
      newDialogVisible.value = false;
      store.dispatch("news/addNews", {
        title: NewsForm.value.title,
        desc: NewsForm.value.desc,
        type: NewsForm.value.type,
        status: "0",
        html: "",
      });
    };

    const newDialogClose = () => {
      NewsForm.value = {
        title: "",
        type: 0,
        desc: "",
      };
    };

    const editBanner = () => {
      idDisabled.value = false;
      dialogFormVisible.value = false;
      store.dispatch("news/setNews", {
        type: 'banner',
        data: {
          ...bannerForm.value
        }
      });
    };

    const dialogClose = () => {
      bannerForm.value = {
        title: "",
        imgUrl: "",
        bgUrl: "",
      };
    };

    onMounted(() => {
      store.dispatch("news/getNews");
    });

    return {
      dialogFormVisible,
      bannerForm,
      showAddDialog,
      showBannerDialog,
      newDialogVisible,
      isEdit,
      addDept,
      addNews,
      categoryOptions,
      NewsForm,
      showNewDialog,
      editBanner,
      news,
      dialogClose,
      changeStatus,
      gotoEditor,
      deleteNews,
      deleteDialogVisible,
      ensureDelete,
      newDialogClose,
    };
  },
});
</script>
<style lang="scss">
.title {
  width: 200px;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  font-weight: bold;
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
  border: 1px solid #396aff;
  color: #396aff;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    background: #396aff;
    color: #fff;
  }
}

.line {
  width: 206px;
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
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
  padding: 0;
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

.custom-tree-a-node {
  margin-left: 20px;
  color: blue;
}

.drawer-footer {
  margin-top: 50px;
}
</style>
