<template>
  <div style="height:100px">
    <div class="add-file-right" style="height:70px;margin-left:100px;margin-top:15px;">
        <input v-show="false" id="file" type="file" ref="fileRef" @change="getFile($event)" class="add-file-right-input" style="margin-left:70px;" accept=".bmp,.jpg,.png,.jpeg">
        <el-button @click="uploadFile" v-if="inputShow" >上传</el-button>
        <div v-if="addArr.arr.length > 0">{{addArr.arr[0].name}}<el-button @click="resetAdd" size="small" type="text" style="margin-left: 20px">删除</el-button></div>
        <div style="font-size: 12px;color: #999">支持扩展名.bmp、.jpg、.jpeg、.png</div>
    </div>
  </div>
</template>

<script lang="ts">
import  { useRouter, useRoute} from 'vue-router'
import  { useStore } from 'vuex'
import { ElInput, ElMessage } from 'element-plus'
import {defineComponent, onMounted, reactive, ref, computed, watch, toRaw} from 'vue'
  export default defineComponent(
    {
      name: 'Upload',
      setup(props, {emit}){
        let activeName = ref('product')
        let inputShow = ref(true)
        const formatArr = reactive(['jpg', 'png', 'jpeg', 'bmp'])
        let addArr = reactive({
          arr: []
        })
        const formLabelWidth = '120px'
        let dialogTitle = ref('')
        const store = useStore()
        const fileRef = ref(null)
        const getFile = (event) => {
          var file = event.target.files;
          for(var i = 0;i<file.length;i++){
              var imgName = file[i].name;
              var idx = imgName.lastIndexOf(".");  
              if (idx != -1){
                var ext = imgName.substr(idx+1).toUpperCase();   
                ext = ext.toLowerCase();
                if (formatArr.includes(ext)) {
                  addArr.arr.push(file[i]);
                  inputShow.value = false
                } else {
                  ElMessage('上传正确格式的文件')
                }  
              }
          }
        }

        const submitAddFile = () => {
            if(0 == addArr.arr.length){
              ElMessage('先选择文件')
              return;
            }
            var formData = new FormData();
            // formData.append('num', this.addType);
            // formData.append('linkId',addId);
            // formData.append('rfilename', addFileName);
            formData.append('file', addArr.arr[0]);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              // 'Authorization': this.token
            }
          };
          store.dispatch('global/uploadFile', {
            formData,
            cb: (url) => {
              emit('submitSuccess', url)
            }
          })
        }

        const resetAdd = () => {
          addArr.arr = []
          inputShow.value = true
          let fileDom = <HTMLInputElement>document.getElementById('file');
          fileDom.value = ''
        }

        const uploadFile = () => {
          fileRef.value.dispatchEvent(new MouseEvent('click'))
        }


        return {
          activeName,
          inputShow,
          formLabelWidth,
          dialogTitle,
          addArr,
          getFile,
          fileRef,
          submitAddFile,
          resetAdd,
          uploadFile,
        }
      }
    }
  )
  
</script>

<style lang="scss">


</style>
