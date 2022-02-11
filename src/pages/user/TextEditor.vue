<template>
  <div id="TextEditor">
    <div id="TextEditorNav">
      <div ref='toolbarContainer'></div>
    </div>
    <div id="TextEditorMain">
      <div id="TextEditorMainCode">
        <div ref='textContainer'></div>
      </div>
      <div id="TextEditorMainShow" v-html="articleHtml"></div>
    </div>
  </div>
</template>

<script>
import WangEditor from 'wangeditor';
// import {textService, updateFile} from './../service/api/index'
// import axios from "axios";
// 设置菜单
const menus = [
  'head',
  'bold',
  'fontSize',
  'fontName',
  'italic',
  'underline',
  'strikeThrough',
  'indent',
  'lineHeight',
  'foreColor',
  'backColor',
  'link',
  'todo',
  'justify',
  'quote',
  'emoticon',
  'image',
  'splitLine',
]
const LOCAL_BASE_URL = '/api';
export default {
  name: "TextEditor",
  data() {
    return {
      articleHtml: "",
      editor: null
    }
  },
  mounted() {
    // 设置工具栏和编辑区分开
    this.editor = new WangEditor(this.$refs.toolbarContainer, this.$refs.textContainer);
    // 设置z-index
    const editor = this.editor;
    editor.config.zIndex = 1;
    // 设置内容变化事件
    editor.config.onchange = (newHtml) => {
      this.onChange(newHtml)
    };
    // 设置placeholder
    editor.config.placeholder = '请输入博文内容';
    // 图片菜单配置
    editor.config.menus = menus;
    // 图片上传配置
    editor.config.showLinkImg = false;
    editor.config.showLinkImgAlt = false;
    editor.config.showLinkImgHref = false;
    // 自己实现图片上传
    editor.config.customUploadImg = (resultFiles, insertImgFn) => {
      this.updateImg(resultFiles[0], insertImgFn);
    }
    editor.create();
  },
  methods: {
    onChange(newHtml) {
      this.articleHtml = newHtml;
    },
    updateImg(image, insertImgFn) {
      if (image) {
        const file = new FormData()
        file.append('image', image);
        updateFile(file).then(res => {
          if (res.status === 200) {
            insertImgFn(res.result);
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#TextEditor {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  #TextEditorNav {
    height: 40px;
    width: 98%;
    margin-left: 1%;
    margin-right: 1%;
    background-color: yellow;
  }

  #TextEditorMain {
    flex: 1;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;

    #TextEditorMainCode,
    #TextEditorMainShow {
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      width: 48%;
      height: 100%;
    }
  }

  .toolbar {
    border: 1px solid #ccc;
  }

  .text {
    border: 1px solid #ccc;
    min-height: 400px;
  }
}
</style>
