import { createStore } from 'vuex'
import login from './login'
import user from './user'
import news from './news'
import product from './product'
import solve from './slove'
import about from './about'
import home from './home'
import global from './global'

const store = createStore({
  modules: {
    login,
    user,
    news,
    product,
    about,
    home,
    global,
    solve
  }
})

export default store

// 重置state数据
export function clearState(state:any, initData:any) {
  Object.keys(state).forEach(key => {
    if (!initData[key]) {
      delete state[key]
    }
  })
  Object.keys(initData).forEach(key => {
    state[key] = initData[key]
  })
}
// 清除store
export function clearStore(index?:any) {
  if (!store) return
  const modules = ['home', 'login', 'classify', 'approval', 'user', 'news', 'product']
  if (index) {
    store.commit(`${modules[index]}/resetState`)
  } else {
    modules.forEach(item => {
      store.commit(`${item}/resetState`)
    })
  }
}

