import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter, router } from './router'
import './assets/base.css'
import 'uno.css'

const setup = async () => {
  const app = createApp(App)

  // 设置状态管理
  setupStore(app)

  // 设置路由
  setupRouter(app)

  await router.isReady()

  app.mount('#app')
}

setup()
