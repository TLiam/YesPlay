//1. 引入路由创建函数
import {createRouter, createWebHashHistory} from "vue-router";

//2. 路由配置
let routes = [
    {
        path: '/home',  // 首页
        name: 'home',
        component: () => import('@/views/home.vue'),
        children: [
        ]
    },
    {
        path: '/explore',  // 发现页
        name: 'explore',
        component: () => import('@/views/explore.vue')
    }
    ,
    {
        path: '/library',  // 音乐库
        name: 'library',
        component: () => import('@/views/library.vue')
    }
    ,
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search.vue')
    }
    ,
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/playList',
        component: () => import('@/views/playList.vue')
    }
    ,
    {
        path: '/',
        redirect: '/home'
    }
]

//3.路由实例
let router = createRouter({ //插件路由对象
    // routes:routes
    routes,
    history: createWebHashHistory(), // 路由模式为必传项
});

//4.导出路由实例，让他去控制vue根
export default router