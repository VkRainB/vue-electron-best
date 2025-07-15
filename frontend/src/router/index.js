import { createRouter, createWebHashHistory } from 'vue-router';
import basicRoutes from './routes/base';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/home') {
    // ipc.invoke('win:get-state').then((state) => {
    //   // 不是最大化则恢复窗口大小
    //   !state.isMaximized && ipc.send('win:setSize', 'large');
    // });
  }
  next();
});

export function setupRouter(app) {
  app.use(router);
}
