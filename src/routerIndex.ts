import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from "vue-router"

// import home from "./pages/home/index.vue";
import login from "./pages/login/index.vue";
import dc from "./pages/dc/index.vue";
import about from "./pages/about/list.vue";
import config from "./pages/config/index.vue";
import home from "./pages/home/index.vue";
import solve from "./pages/solve/index.vue";
import news from "./pages/news/index.vue";

const routes: RouteRecordRaw[] = [
  { 
    path: "/",
    redirect: '/dc/home'
  },
  // { path: "/home", name: 'home', component: home },
  { path: "/login", name: 'login', component: login },
  { path: "/dc", name: 'dc', component: dc, 
      children: [
      {
        path: 'about',
        name: 'about',
        component: about,
      },
      {
        path: 'config',
        name: 'config',
        component: config,
      },
      {
        path: 'home',
        component: (resolve) => import('./pages/home/list.vue'),
        name: 'home',
      },
      {
        path: 'solve',
        component: news,
        children: [
          {
            path: 'list',
            component: (resolve) => import('./pages/solve/index.vue'),
            name: 'solve',
          },
          {
            path: 'detail',
            component: (resolve) => import('./pages/solve/detail.vue'),
            name: 'solveDetail',
          }
        ]
      },
      {
        path: 'news',
        component: news,
        children: [
          {
            path: 'list',
            component: (resolve) => import('./pages/news/list.vue'),
            name: 'news',
          },
          {
            path: 'detail',
            component: (resolve) => import('./pages/news/detail.vue'),
            name: 'newsDetail',
          }
        ]
      },
      {
        path: 'product',
        component: news,
        children: [
          {
            path: 'list',
            component: (resolve) => import('./pages/product/index.vue'),
            name: 'product',
          },
          {
            path: 'detail',
            component: (resolve) => import('./pages/product/detail.vue'),
            name: 'productDetail',
          }
        ]
      },
    ] 
  },
];




const router = createRouter({
  // 4. 采用hash 模式
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   let token = sessionStorage.getItem('odcUser')
//   if (to.path !== '/login' && !token) {
//     next({path: '/login', query: {url: to.fullPath}})
//   } else {
//     next()
//   }
// })

export default router 
