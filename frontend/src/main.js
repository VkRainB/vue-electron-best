import { createApp } from 'vue';
import App from './App.vue';
import { router, setupRouter } from './router';
import { setupStore } from './store';
import './assets/base.css';
import 'uno.css';

async function setup() {
  const app = createApp(App);

  // 设置状态管理
  setupStore(app);

  // 设置路由
  setupRouter(app);

  await router.isReady();

  app.mount('#app');
}

setup();
