import { Module } from 'vuex'
import API from '../../api/api'
import { clearState } from '../index'

export type IUser = Record<'username' | 'password', string>

export interface ILoginState {
  user: IUser
}

// 初始化数据
const initState = () => ({
  user: {
    username: 'admin',
    password: 'admin'
  }
})

const LoginStore: Module<ILoginState, Record<string, unknown>> = {
  namespaced: true,
  state: initState(),
  mutations: {
    setUser(state, payload: IUser) {
      state.user = payload
    },
    resetState(state) {
      clearState(state, initState())
    }
  },
  actions: {
    setUser({ commit }, payload: IUser) {
      commit('setUser', payload)
    },

    login(state, params) {
      API.login(params).then((res:any) => {
        sessionStorage.setItem('odcUser', JSON.stringify(params))
        sessionStorage.setItem('odcToken', res.token)
        params.cb && params.cb()
      })
    },

    logout(state, params) {
      API.logout().then((res:any) => {
        sessionStorage.setItem('odcUser', '')
        params.cb && params.cb()
      })
    },
    
  }
}

export default LoginStore
