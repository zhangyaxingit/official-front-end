import API from '../../api/api'
import { clearState } from '../index'
import { Module } from 'vuex'

import allData from '../../data/home.json'

const product = allData.product
const solve = allData.solve
const news = allData.news
const partner = allData.partner

export interface IProduct {
  id: number
  title: string
  desc: string
}

export type INews = Record<'company' | 'industry', number[]>


export interface ISolve {
  id: number
  title: string
  desc: string
}

export interface IClassifyState {
  product: IProduct[]
  solve: ISolve[]
  news: INews
  partner: any[]
}

// 初始化数据
const initState = () => ({
  product,
  solve,
  news,
  partner,
})

const ClassifyStore: Module<IClassifyState, Record<string, unknown>> = {
  namespaced: true,
  state: initState(),
  mutations: {
    // chooseCatalog(state, payload: string) {
    //   state.curCategory = payload
    // },
    addProduct(state, pid:any) {
      state.product = [...state.product, {
        id: Math.floor(Math.random() * (1000 - 1 + 1) + 1), 
        ...pid
      }]
    },
    editProduct(state, pid:any) {
      state.product = state.product.map(item => {
        return item.id === pid.id ? {
          ...pid
        }: item
      })
    },
    addSolve(state, pid:any) {
      state.solve = [...state.solve, {
        id: Math.floor(Math.random() * (1000 - 1 + 1) + 1), 
        ...pid
      }]
    },
    editSolve(state, pid:any) {
      state.solve = state.solve.map(item => {
        return item.id === pid.id ? {
          ...pid
        }: item
      })
    },
    editNews(state, pid:any) {
      state.news = {
        ...state.news,
        ...pid,
      }
    },
    delete(state, pid:any) {
      state[pid.type] = state[pid.type].filter((item:any) => item.id !== pid.id)
    }
  },
  actions: {
    getHome({state, commit}) {
      API.getHome().then((res:any) => {
        console.log(99999, res)
        // const { banner, list } = res
        // commit('setProduct', {
        //   banner: banner || {
        //     title: '',
        //     imgUrl: '',
        //     bgUrl: ''
        //   },
        //   list: list || []
        // })
      })
    },
    // addProduct({state, dispatch}, info) {
    //   const { title, desc: desc, type, status, html} = info
    //   const data = {
    //     title, 
    //     type: `${type}`, 
    //     status, 
    //     desc, 
    //     html
    //   }
    //   API.addProduct(data).then(res => {
    //     dispatch('getProduct')
    //   })
    // },
  }
}

export default ClassifyStore
