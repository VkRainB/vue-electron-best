import { createApp } from 'vue'
import App from './App.vue'
// import { setupStore } from './store'
import { setupRouter, router } from './router'
import './assets/main.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'
// import { devtools } from '@vue/devtools'

// process.env.NODE_ENV === 'development' && devtools.connect()

const setup = async () => {
  const app = createApp(App)

  // setupStore(app)

  setupRouter(app)

  await router.isReady()

  app.mount('#app')
}

setup()
