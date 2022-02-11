import API from '../../api/api'
import { clearState } from '../index'
import { Module } from 'vuex'
import { 
  IAboutState, 
  IValueItem, 
  ICertItem, 
  IHistoryItem, 
  IJobItem, 
  IDetail,
} from './actionType'



// 初始化数据
const initState = () => ({
  about: {
    banner: {
      title: '',
      bgUrl: '',
      imgUrl: ''
    },
    introduction: {
      name: '',
      desc: ''
    },
    values: {
      name: '',
      list: []
    },
    credentials: {
      name: '',
      list: []
    },
    history: {
      title: '',
      subTitle: '',
      list: []
    }
  },
  employ: {
    banner: {
      title: '',
      bg: '',
      bg1: ''
    },
    jobs: []
  },
  contact: {
    banner: {
      title: '',
      bg: '',
      bg1: ''
    },
    details: {
      email: [],
      tel: [],
      fax: '',
    }
  }
})

const AboutStore: Module<IAboutState, Record<string, unknown>> = {
  namespaced: true,
  state: initState(),
  mutations: {

    editJob(state, pid:IJobItem) {
      const {jobs} = state.employ
      state.employ = {
        ...state.employ,
        jobs: [...jobs, pid]
      }
    },

    editContact(state, pid:IDetail) {
      state.contact = {
        ...state.contact,
        details: pid
      }
    },

    setAbout(state, pid:any) {
      state.about = pid
    },

    setContact(state, pid:any) {
      state.contact = pid
    },

    setEmploy(state, pid:any) {
      state.employ = pid
    },

  },
  actions: {
    getContact({state, commit}) {
      API.getContact().then((res:any) => {
        const { banner, email, fax, tel } = res
        commit('setContact', {
          banner: banner || {
            title: '',
            imgUrl: '',
            bgUrl: ''
          }, 
          details: {
            email: email ? email.list : [''],
            tel: tel ? tel.list : [''],
            fax: fax || ''
          }
        })
      })
    },

    setContact({commit, state, dispatch}, info: any) {
      const {type, data} = info
      let newState = {}
      if (type === 'banner') {
        newState = Object.assign({}, state.contact, { [type]: data })
      } else {
        const {email, tel, fax} = data
        newState = Object.assign({}, { 
          banner: state.contact.banner,
          email: {
            list: email || []
          },
          tel: {
            list: tel || []
          },
          fax: fax || '' 
        })
      }

      API.setContact(newState).then(res => {
        dispatch('getContact')
      })
    },

    getEmploy({state, commit}) {
      API.getEmploy().then((res:any) => {
        const { banner, list } = res
        commit('setEmploy', {
          banner: banner || {
            title: '',
            imgUrl: '',
            bgUrl: ''
          }, 
          jobs: list ? list.jobs : []
        })
      })
    },

    setEmploy({commit, state, dispatch}, info: any) {
      const {type, data} = info
      const {jobs, banner} = state.employ
      let newState = {}
      if (type === 'banner') {
        newState = Object.assign({}, state.employ, { [type]: data })
      } else {
        const curItem = jobs.find((item:any) => item.id === data.id)
        if (!curItem) { // 新增
          newState = Object.assign({}, { 
            banner: banner,
            list: {
                jobs: [...jobs, data]
            }
          })
        } else {  // 编辑
          newState = Object.assign({}, { 
            banner: banner,
            list: {
              jobs: jobs.map((item: any) => {
                return item.id === data.id ? data: item
              })
            }
          })
        }
      }

      API.setEmploy(newState).then(res => {
        dispatch('getEmploy')
      })
    },

    getAbout({state, commit}) {
      API.getAbout().then((res:any) => {
        const { banner, credentials, introduction, history, values } = res
        commit('setAbout', {
          banner, 
          credentials, 
          introduction,
          history, 
          values: values || {name: '', list: []}
        })
      })
    },

    sort({commit, state, dispatch}, info: any) {
      const { type, list } = info
      if (type === 'jobs') {
        const { banner } = state.employ

        let newState = Object.assign({}, {
          banner,
          list: {
            jobs: list
          }
        })
  
        API.setEmploy(newState).then(res => {
          dispatch('getEmploy')
        })
      } else {
        const { name } = state.about[type]

        let newState = Object.assign({}, state.about, { [type]: {
          name,
          list
        }})
  
        API.setAbout(newState).then(res => {
          dispatch('getAbout')
        })
      }

    },

    setAbout({commit, state, dispatch}, info: any) {
      const {type, data} = info

      let newState = {}
      if (type === 'values' || type === 'credentials' || type === 'history') {
        const { name, list } = state.about[type]
        const curItem = list.find((item:any) => item.id === data.id)
        if (!curItem) {  // 新增
          newState = Object.assign({}, state.about, { [type]: {
            name,
            list: [...list, data]
          }})
        } else { // 编辑
          newState = Object.assign({}, state.about, { [type]: {
            name,
            list: list.map((item: any) => {
              return item.id === data.id ? data: item
            })
          }})
        }
      } else {
        newState = Object.assign({}, state.about, { [type]: data })
      }

      API.setAbout(newState).then(res => {
        dispatch('getAbout')
      })
    },

    deleteItem({commit, state, dispatch}, info: any) {
      const { id, type } = info
      if (type === 'jobs') {
        console.log('删除工作', info)
        const jobs = state.employ[type]

        let newState = Object.assign({}, state.employ, { list: {
          jobs : jobs.filter((item:any) => item.id !== id),
        }})

        API.setEmploy(newState).then(res => {
          dispatch('getEmploy')
        })

      } else {
        const { name, list } = state.about[type]

        let newState = Object.assign({}, state.about, { [type]: {
          name,
          list: list.filter((item:any) => item.id !== id)
        }})
  
        API.setAbout(newState).then(res => {
          dispatch('getAbout')
        })
      }
    },
    
  }
}

export default AboutStore
