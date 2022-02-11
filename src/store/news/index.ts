import API from '../../api/api'
import { clearState } from '../index'
import { Module } from 'vuex'

export interface INews {
  id: number
  title: string
  desc: string
  status: string
  type: string
  html: string
}

export interface Ibanner {
  title: string
  imgUrl: string
  bgUrl: string
}

export interface INewsState {
  banner: Ibanner,
  list: INews[]
}

// 初始化数据
const initState = () => ({
  banner: {
    title: '',
    imgUrl:'',
    bgUrl: ''
  },
  list: [],
})

const NewsStore: Module<INewsState, Record<string, unknown>> = {
  namespaced: true,
  state: initState(),
  mutations: {
    setNews(state, pid:any) {
      state.list =  pid.list
      state.banner =  pid.banner
    }
  },
  actions: {
    getNews({state, commit}) {
      API.getNews().then((res:any) => {
        const { banner, list } = res
        commit('setNews', {
          banner: banner || {
            title: '',
            imgUrl: '',
            bgUrl: ''
          },
          list: list || []
        })
      })
    },
    addNews({state, dispatch}, info) {
      const { title, desc: desc, type, status, html} = info
      const data = {
        title, 
        type: `${type}`, 
        status, 
        desc, 
        html
      }
      API.addNews(data).then(res => {
        dispatch('getNews')
      })
    },

    
    updateNews({state, dispatch}, info: any) {
      const { data, cb } = info
      API.updateNews(data).then(() => {
        dispatch('getNews')
        cb && cb()
      })
    },

    deleteNews({state, dispatch}, id) {
      API.deleteNews(id).then(() => {
        dispatch('getNews')
      })
    },

    setNews({commit, state, dispatch}, info: any) {

      const {type, data} = info
      let newState = {}
      if (type === 'banner') {
       
        newState = Object.assign({}, state, { [type]: data})
      } else {
      }

      API.setNews(newState).then(res => {
        dispatch('getNews')
      })
    },
  }
}

export default NewsStore
