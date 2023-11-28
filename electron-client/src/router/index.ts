import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory, } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    }]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router