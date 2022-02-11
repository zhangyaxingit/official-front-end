import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import routerIndex from './routerIndex'  // 引入路由对象实例
import store from './store'  // 引入路由对象实例
import "./assets/style/global.css"

const app = createApp(App)

app.use(store).use(routerIndex).use(ElementPlus).mount('#app')
