import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { graphics } from "./module/graphics";
import { webgl } from './module/webgl';
import { three } from './module/three';
import { other } from './module/other';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/Index'
    },

    {
        path: '/Index',
        name: 'Index',
        component: () => import('@/components/other/PointsBillboards.vue')
    },
    ...other,
    ...three,
    ...webgl,
    ...graphics

]



const router = createRouter({
    history: createWebHistory(),
    routes,
});
// 导航守卫
router.beforeEach((to, from, next) => {
    if (to.path !== "/favicon.icon") {
        document.title = to.meta.title ? (to.meta.title as string) : "";
        next();
    }
});

export default router;

