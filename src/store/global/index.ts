import API from '../../api/api'
import { clearState } from '../index'
import { Module } from 'vuex'
export interface IHeader {
  title: string
  icon: string
}

export interface IFooter {
  cert: string
  address: string
  instituteName: string
  code: string[]
  right: string
}

export interface IGlobalState {
  header: IHeader
  footer: IFooter
}

// 初始化数据
const initState = () => ({
  header: {
    title: '',
    icon: ''
  },
  footer: {
    cert: '',
    address: '',
    instituteName: '',
    code: [''],
    right: ''
  }
})

const GlobalStore: Module<IGlobalState, Record<string, unknown>> = {
  namespaced: true,
  state: initState(),
  mutations: {
    updateSetting(state, pid:any) {
      console.log(pid.content)
      state.header = pid.content ? pid.content.header : {
        title: '',
        icon: ''
      }

      state.footer = pid.content ? pid.content.footer : {
        cert: '',
        address: '',
        instituteName: '',
        code: [''],
        right: ''
      }
    },
  },
  actions: {

    getSetting({state, commit}) {
      API.getSetting().then((res:any) => {
        commit('updateSetting', res)
      })
    },

    updateSetting({state, commit, dispatch}, info) {
      const {type, data} = info
      const defualtData = type === 'header' ? {
        title: '',
        icon: ''
      } : {
        cert: '',
        address: '',
        instituteName: '',
        code: [''],
        right: ''
      }
      const content = Object.assign({}, state, {
        [type]: data ? data : defualtData
      })

      API.updateSetting({content}).then((res:any) => {
        dispatch('getSetting', res)
      })
    }
  }
}

export default GlobalStore
