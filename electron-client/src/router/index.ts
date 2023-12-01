import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory, } from 'vue-router'
import Layouts from '../layouts/index.vue'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue'),
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