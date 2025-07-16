import { createApp } from 'vue';
import App from './App.vue';
import { registerIcons } from './plugins/icon';
import { router, setupRouter } from './router';
import store from './stores';
import '@/assets/styles/base.css';
import 'uno.css';
import 'virtual:svg-icons-register';

window.ipc = window.electron.ipcRenderer;
async function setup() {
  const app = createApp(App);

  // 设置状态管理
  app.use(store);

  // 设置路由
  setupRouter(app);

  registerIcons(app);

  await router.isReady();

  app.mount('#app');
}

setup();
