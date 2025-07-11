import { createRouter, createWebHashHistory } from 'vue-router';
import basicRoutes from './routes/base';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 判断是否去到 login 页面
  if (to.path === '/auth/login') {
    // 兼容性判断，防止 window.electron 不存在
    if (window.electron && window.electron.ipcRenderer) {
      window.electron.ipcRenderer.send('win:setSize', 'small');
    }
  }
  next();
});

export function setupRouter(app) {
  app.use(router);
}
