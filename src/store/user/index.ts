import API from '../../api/api'
import { clearState } from '../index'
import { Module } from 'vuex'

import userData from './../../data/name.json'
import { getAllData, getPriData } from '../../data/name.js'
import { DeprecationTypes } from 'vue-demi'

const parseTreeData = (data:any) => {
  data.forEach((item:any) => {
    item.userInfo = getAllData()
    item.priInfo = getPriData()
    if (item.children && item.children.length) {
      parseTreeData(item.children);
    }
  });
};

const newUserData = [...userData]
parseTreeData(newUserData)

export interface IUser {
  leader: string,
  name: string,
  email: string,
  tel: string
}

export interface IRole {
  roleKey: string,
  roleName: string,
  admin: boolean
}

export interface IApi {
  apiGroup?: string,
  description?: string,
  path: string,
  method: boolean
}

export interface IPri {
  dataName: string,
  dataId: string,
  right: string,
}



export interface ItreeNode {
  id: number
  label: string
  userInfo ?: IUser
  priInfo ?:IPri[]
  children ?: ItreeNode[]
}

export interface IUserData {
  roleKey : string
  id: string | number
  username: string
  avatar?: string
  email?: string
  sex?: string
  deptId?: string | number
  deptIds?: string | number
  nickName?: string
  phone?: string | number
  postIds?: string | number
  status?: string
}


export interface IClassifyState {
  groupList: ItreeNode[]
  roleList: IRole[]
  apiList: IApi[]
  bindedApiList: IApi[]
  bindedMenu: any[]
  userList: IUserData[]
  menuTree: any[]
  deptTree: any[]
  userMenuTree: any[]
}

// 初始化数据
const initState = () => ({
  groupList: newUserData,
  userList: [],
  roleList: [],
  apiList: [],
  bindedApiList: [],
  bindedMenu: [],
  menuTree: [],
  deptTree: [],
  userMenuTree: [
    { id: 1, name: 'home', title: '首页' },
    { id: 2, name: 'product', title: '产品' },
    { id: 3, name: 'solve', title: '案例' },
    { id: 4, name: 'news', title: '新闻资讯' },
    { id: 5, name: 'about', title: '关于我们1111' },
    { id: 6, name: 'config', title: '全局配置' },
  ]
})

const UserStore: Module<IClassifyState, Record<string, unknown>> = {
  namespaced: true,
  state: initState(),
  getters: {
    apiList: (state) => {
      return state.apiList
    },
    bindedApiList: (state) => {
      return state.bindedApiList
    },
    menuOptions: (state) => {
      return [{
        id: 0,
        title: '0',
        children: state.menuTree
      }]
    },
    deptOptions: (state) => {
      return state.deptTree
    },
    bindedMenu: (state) => {
      return state.bindedMenu
    },
    menuTree: (state) => {
      return state.menuTree
    },

  },
  mutations: {
    refreashRoleList(state, payload: IRole[]) {
      state.roleList = payload
    },
    refreashUserList(state, payload: IUserData[]) {
      state.userList = payload
    },
    refreashApiList(state, payload: IApi[]) {
      state.apiList = payload
    },
    refreashBindedApiList(state, payload: IApi[]) {
      state.bindedApiList = payload
    },
    resetState(state) {
      clearState(state, initState())
    },
    refreashMenuTree(state, payload: any[]) {
      state.menuTree = payload
    },
    refreashDeptTree(state, payload: any[]) {
      state.deptTree = payload
    },
    refreashUserMenuTree:  (state, payload: any[]) => {
      return state.userMenuTree = payload
    },
    refreashBindedMenu:  (state, payload: any[]) => {
      return state.bindedMenu = payload
    },
  },
  actions: {
    addRole({commit}, params) {
      API.addRole(params).then((res: any) => {
        params.cb && params.cb()
      })
    },

    getRoleList({commit}, params) {
      API.getRoleList({page: 1, size: 10}).then((res: any) => {
        commit('refreashRoleList', res.content.map((item: any) => {
          return {
            roleKey: item.roleKey,
            roleName: item.roleName,
            admin: item.admin
          }
        }))
      })
    },

    getApiList({commit}, params) {
      API.getApiList().then((res: any) => {
        commit('refreashApiList', res)
      })
    },

    getBindedApis({commit}, params) {
      API.getBindedApis(params).then((res: any) => {
        commit('refreashBindedApiList', res)
      })
    },

    deleteRole({commit}, params) {
      API.deleteRole({roleKey: params.roleKey}).then((res: any) => {
        params.cb && params.cb()
      })
    },

    bindApi({commit}, params) {
      API.bindApi(params.data).then((res: any) => {
        params.cb && params.cb()
      })
    },

    getUserList({commit}, params) {
      API.getUserList({page: 1, size: 10}).then((res: any) => {
        commit('refreashUserList', res.content.map((item: IUserData) => {
          return {
            avatar: item.avatar,
            email: item.email,
            roleKey: item.roleKey,
            sex: item.sex,
            deptId: item.deptId,
            deptIds: item.deptIds,
            nickName: item.nickName,
            phone: item.phone,
            postIds: item.postIds,
            status: item.status,
            id: item.id,
            username: item.username,
          }
        }))
      })
    },

    addUser({commit}, params) {
      API.addUser(params).then((res: any) => {
        params.cb && params.cb()
      })
    },

    getMenuTree({commit}, params) {
      API.getMenuTree().then((res: any) => {
        commit('refreashMenuTree', res.map((item: any) => {
          return {
            ...item
          }
        }))
      })
    },

    addMenu({commit}, params) {
      API.addMenu(params).then((res: any) => {
        params.cb && params.cb()
      })
    },

    deleteMenu({commit}, params) {
      API.deleteMenu({id: params.id}).then((res: any) => {
        params.cb && params.cb()
      })
    },

    updateMenu({commit}, params) {
      API.updateMenu(params).then((res: any) => {
        params.cb && params.cb()
      })
    },

    getDeptTree({commit}, params) {
      API.getDeptTree().then((res: any) => {
        commit('refreashDeptTree', res.map((item: any) => {
          return {
            ...item
          }
        }))
      })
    },

    addDept({commit}, params) {
      API.addDept(params).then((res: any) => {
        params.cb && params.cb()
      })
    },

    deleteDept({commit}, params) {
      API.deleteDept({id: params.id}).then((res: any) => {
        params.cb && params.cb()
      })
    },

    updateDept({commit}, params) {
      API.updateDept(params).then((res: any) => {
        params.cb && params.cb()
      })
    },

    getMenuTreeByUser({commit}, params) {
      API.getMenuTreeByUser().then((res: any) => {
        commit('refreashUserMenuTree', res.map((item: any) => {
          return {
            ...item
          }
        }))
        params.cb && params.cb()
      })
    },

    getRoleMenu({commit}, params) {
      API.getRoleMenu(params).then((res: any) => {
        commit('refreashBindedMenu', res.map((item: any) => item.id))
      })
    },
    bindMenu({commit}, params) {
      API.bindMenu(params.data).then((res: any) => {
        params.cb && params.cb()
      })
    },
    
  }
}

export default UserStore
