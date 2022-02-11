<template>
  <div>
    <full-page :options="options" ref="fullpage">
      <div class="section">
        <h3>vue-fullpage.js</h3>
      </div>
      <div class="section">
        <div class="slide">
          <h3>Slide 2.1</h3>
        </div>
        <div class="slide">
          <h3>Slide 2.2</h3>
        </div>
        <div class="slide">
          <h3>Slide 2.3</h3>
        </div>
      </div>
      <div class="section">
        <h3>Section 3</h3>
      </div>
    </full-page>
  </div>
  <!-- <div id="ArticleText">
    <el-affix :offset="0">
      <div id="ArticleTextHead">
        <div id="ArticleTextHeadBack">
          <i class="el-icon-arrow-left"></i>
          文章管理
        </div>
        <div id="ArticleTextHeadTitle">
          <div id="ArticleTextHeadTitleOperate">
            <el-button type="info" plain>保存草稿</el-button>
            <el-button type="danger" plain>发布文章</el-button>
          </div>
        </div>
      </div>
    </el-affix>
    <div id="ArticleTextContent">
      <TextEditor v-model="content"/>
    </div>
  </div> -->

</template>

<script>
import TextEditor from "./TextEditor.vue";

export default {
  name: "ArticleText",
  components: {TextEditor},
  data() {
    return {
      articleTitle: "",
      content: "",
      circleUrl: "https://profile.csdnimg.cn/B/4/2/3_kaisarh",
      options: {
        licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
        //是否显示导航，默认为false
        navigation: true,
        //为每个section设置背景色
        sectionsColor: [
            "#41b883",
            "#ff5f45",
            "#0798ec",
            "#fec401",
            "#1bcee6",
            "#ee1a59",
            "#2c3e4f",
            "#ba5be9",
            "#b4b8ab"
        ],
      }
    }
  },
}
</script>



<style lang="scss" scoped>
#ArticleText {
  height: 100%;
  width: 100%;
  position: relative;
  user-select: none;
  display: flex;
  flex-direction: column;

  #ArticleTextHead {
    height: 75px;
    width: 100%;
    //background-color: red;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    z-index: 999;
    background-color: white;

    #ArticleTextHeadBack {
      width: 150px;
      font-weight: bold;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .el-divider {
      height: 24px;
    }

    #ArticleTextHeadTitle {
      display: flex;
      align-items: center;
      width: 90%;
      //background-color: yellow;
      position: relative;

      .el-input {
        flex: 1;
      }

      #ArticleTextHeadTitleOperate {
        width: 250px;
        margin: 0 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .el-avatar {
          cursor: pointer;
        }
      }
    }
  }

  #ArticleTextContent {
    flex: 1;
    margin-top: 10px;
    width: 100%;
  }
}
</style>
