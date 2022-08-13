import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Index'
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/favicon.icon') {
    document.title = to.meta.title ? (to.meta.title as string) : '';
    next();
  }
});

export default router;
