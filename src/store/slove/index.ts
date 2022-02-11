import API from '../../api/api'
import { clearState } from '../index'
import { Module } from 'vuex'


export interface ISolve {
  id: number
  title: string
  desc: string
  status: string
  html: string
}

export interface Ibanner {
  title: string
  imgUrl: string
  bgUrl: string
}

export interface ISolveState {
  banner: Ibanner,
  list: ISolve[]
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

const SolveStore: Module<ISolveState, Record<string, unknown>> = {
  namespaced: true,
  state: initState(),
  mutations: {
    setSolve(state, pid:any) {
      state.list =  pid.list
      state.banner =  pid.banner
    }
  },
  actions: {
    getSolve({state, commit}) {
      API.getSolve().then((res:any) => {
        const { banner, list } = res
        commit('setSolve', {
          banner: banner || {
            title: '',
            imgUrl: '',
            bgUrl: ''
          },
          list: list || []
        })
      })
    },
    addSolve({state, dispatch}, info) {
      const { title, desc: desc, type, status, html} = info
      const data = {
        title, 
        status, 
        desc, 
        html
      }
      API.addSolve(data).then(res => {
        dispatch('getSolve')
      })
    },

    
    updateSolve({state, dispatch}, info: any) {
      const { data, cb } = info
      const newData = { ...info, type: `${data.type}` }
      API.updateSolve(data).then(() => {
        dispatch('getSolve')
        cb && cb()
      })
    },

    deleteSolve({state, dispatch}, id) {
      API.deleteSolve(id).then(() => {
        dispatch('getSolve')
      })
    },

    

    setSolve({commit, state, dispatch}, info: any) {

      const {type, data} = info
      let newState = {}
      if (type === 'banner') {
        newState = Object.assign({}, state, { [type]: data})
      } else {
      }

      API.setSolve(newState).then(res => {
        dispatch('getSolve')
      })
    },
  }
}

export default SolveStore
