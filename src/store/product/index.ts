import API from '../../api/api'
import { clearState } from '../index'
import { Module } from 'vuex'

import productList from './../../data/product.json'


export interface IProduct {
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

export interface IProductState {
  banner: Ibanner,
  list: IProduct[]
}

// 初始化数据
const initState = () => ({
  banner: {
    title: '',
    imgUrl:'',
    bgUrl: ''
  },
  list: productList,
})

const ProductStore: Module<IProductState, Record<string, unknown>> = {
  namespaced: true,
  state: initState(),
  mutations: {
    setProduct(state, pid:any) {
      state.list =  pid.list
      state.banner =  pid.banner
    }
  },
  actions: {
    getProduct({state, commit}) {
      API.getProduct().then((res:any) => {
        const { banner, list } = res
        commit('setProduct', {
          banner: banner || {
            title: '',
            imgUrl: '',
            bgUrl: ''
          },
          list: list || []
        })
      })
    },
    addProduct({state, dispatch}, info) {
      const { title, desc: desc, type, status, html} = info
      const data = {
        title, 
        type: `${type}`, 
        status, 
        desc, 
        html
      }
      API.addProduct(data).then(res => {
        dispatch('getProduct')
      })
    },

    
    updateProduct({state, dispatch}, info: any) {
      const { data, cb } = info
      API.updateProduct(data).then(() => {
        dispatch('getProduct')
        cb && cb()
      })
    },

    deleteProduct({state, dispatch}, id) {
      API.deleteProduct(id).then(() => {
        dispatch('getProduct')
      })
    },

    setProduct({commit, state, dispatch}, info: any) {

      const {type, data} = info
      let newState = {}
      if (type === 'banner') {
       
        newState = Object.assign({}, state, { [type]: data})
      } else {
        // const {email, tel, fax} = data
        // newState = Object.assign({}, { 
        //   banner: state.product.banner,
        //   email: {
        //     list: email || []
        //   },
        //   tel: {
        //     list: tel || []
        //   },
        //   fax: fax || '' 
        // })
      }

      API.setProduct(newState).then(res => {
        dispatch('getProduct')
      })
    },
  }
}

export default ProductStore
