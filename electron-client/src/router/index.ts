import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory, } from 'vue-router'
import Layouts from '../views/index.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        redirect: '/layouts',
        component: Layouts,
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home.vue'),
            },
            {
                path: '/friends',
                name: 'friends',
                component: () => import('../views/friends.vue'),
            },
            {
                path: '/setting',
                name: 'setting',
                component: () => import('../views/setting.vue'),
            }]
    },
    {
        path: '/layouts',
        name: 'layouts',
        component: () => import('../layouts/index.vue'),
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/test.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue'),
    }]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router