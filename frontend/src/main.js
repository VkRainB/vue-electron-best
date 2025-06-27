import { createApp } from 'vue'
import App from './App.vue'
// import { setupStore } from './store'
import { setupRouter, router } from './router'
import './assets/main.css'

const setup = async () => {
  const app = createApp(App)

  // setupStore(app)

  setupRouter(app)

  await router.isReady()

  app.mount('#app')
}

setup()
