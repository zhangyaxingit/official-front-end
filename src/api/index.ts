import axios from 'axios';
import { ElMessage, useModelToggleProps } from 'element-plus'
import Router from '../routerIndex'

axios.interceptors.request.use(
  (config:any) => {
      const token = sessionStorage.getItem('odcToken')
      config.timeout = 30000;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  }
)

axios.interceptors.response.use(
  response => {
      // if ( response.status === 200 && response.request.responseURL.indexOf('isRedirct=true')) {
      //   window.location = response.request.responseURL.split('?')[0]
      // } else 
      if (response.status === 200 && response.data) {
          return response.data
      } else{

          ElMessage.error(response.data.msg)
          Promise.reject(response.data.msg)
      }
  },
  error => {
    if (error.response) {
        // if (error.response.status === 401) {
        //   const fullPath = Router.currentRoute.value.fullPath
        //   // console.log('router是什么？',Router.currentRoute.value.fullPath)
        //   Router.push({path: '/login', query: {url: fullPath}})
        // } else if (error.response.status === 403) {
        //   error.response.data.msg && ElMessage.error(`${error.response.data.msg}, 请联系管理员申请权限`)
        // } else {
        //   error.response.data.msg ? ElMessage.error(error.response.data.msg) : ElMessage.error('很抱歉，接口报错！')
        // }
    }
    return Promise.reject(error.response.data)
  }
)

export default axios;
