<template>
  <div class="tab-container">
    <!-- <div style="text-align: left">产品首屏banner：<el-button  @click="showBannerDialog" style="margin-left: 10px; padding-right: 8px; padding-left: 8px;">添加</el-button></div> -->
    <div class="tab-section">
      <div class="section-title">
        首屏banner<el-button
          type="text"
          @click="showBannerDialog"
          style="margin-left: 10px; padding-right: 8px; padding-left: 8px"
          >编辑</el-button
        >
      </div>
      <div>标题：{{product.banner.title || '--'}}</div>
      <div>背景图片：{{product.banner.bgUrl || '--'}}</div>
      <div>前置图片：{{product.banner.imgUrl || '--'}}</div>
    </div>

    <div class="tab-section">
      <div style="text-align: left">
        产品列表：<el-button
          @click="showNewDialog"
          style="margin-left: 10px; padding-right: 8px; padding-left: 8px"
          >新建产品</el-button
        >
      </div>
      <!-- <div>{{JSON.stringify(product)}}</div> -->
      <div style="width: 100%; margin-top: 20px">
        <draggable
          :list="product.list"
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
                    @click="deleteProduct(element)"
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
      title="编辑产品首屏banner"
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
      <span>确定要将产品删除？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ensureDelete">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="newDialogVisible"
      title="添加产品"
      @close="newDialogClose"
    >
      <el-form :model="productForm">
        <el-form-item label="产品名称">
          <el-input v-model="productForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="产品所属类目">
          <el-select v-model="productForm.type" placeholder="请选择">
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
          <el-input v-model="productForm.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addProduct">保存</el-button>
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
    const deptOptions = computed(() => store.getters["user/deptOptions"]);
    const curParentId = ref(1); // 当前父层级为0，也就是默认根菜单
    const curId = ref(0);

    const product = computed(() => store.state.product);
    const selectedParent = reactive({
      value: [0],
    });
    const parentIdDisabled = ref(false);
    let newDialogVisible = ref(false);
    let deleteDialogVisible = ref(false);
    let curProductId = ref(0);
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
      { label: "类目一", value: 1 },
      { label: "类目二", value: 2 },
      { label: "类目三", value: 3 },
    ]);

    const productForm = ref({
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
      const { banner } = product.value
      bannerForm.value = banner || {
        title: '',
        imgUrl: '',
        bgUrl: ''
      }
    };

    const changeStatus = (item: any) => {
      store.dispatch(`product/updateProduct`, {
        data: {
          ...item,
          status: item.status === "1" ? "0" : "1",
        }
      });
    };

    const gotoEditor = (type: string, item: any) => {
      router.push({
        name: "productDetail",
        params: { id: item ? item.id : 0, type },
      });
    };

    const deleteProduct = (item: any) => {
      deleteDialogVisible.value = true;
      curProductId.value = item.id;
    };

    const ensureDelete = (item: any) => {
      deleteDialogVisible.value = false;
      store.dispatch(`product/deleteProduct`, curProductId.value);
    };

    const addDept = () => {
      idDisabled.value = false;
      dialogFormVisible.value = false;
    };

    const showNewDialog = () => {
      newDialogVisible.value = true;
    };
    const addProduct = () => {
      newDialogVisible.value = false;
      store.dispatch("product/addProduct", {
        title: productForm.value.title,
        desc: productForm.value.desc,
        type: productForm.value.type,
        status: "0",
        html: "",
      });
    };

    const newDialogClose = () => {
      productForm.value = {
        title: "",
        type: 0,
        desc: "",
      };
    };

    const editBanner = () => {
      idDisabled.value = false;
      dialogFormVisible.value = false;
      store.dispatch("product/setProduct", {
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
      store.dispatch("product/getProduct");
    });

    return {
      dialogFormVisible,
      bannerForm,
      showAddDialog,
      showBannerDialog,
      newDialogVisible,
      isEdit,
      addDept,
      addProduct,
      categoryOptions,
      productForm,
      showNewDialog,
      editBanner,
      product,
      dialogClose,
      changeStatus,
      gotoEditor,
      deleteProduct,
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
