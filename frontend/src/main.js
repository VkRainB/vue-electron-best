import { createApp } from 'vue';
import App from './App.vue';
import { setUpContextMenu } from './plugins/contextMenu';
import { registerIcons } from './plugins/icon';
import router from './router';
import store from './store';
import 'virtual:svg-icons-register';

import '@/assets/styles/elementTheme.scss';
import 'virtual:uno.css';
import '@/assets/styles/base.css';

async function setup() {
  const app = createApp(App);

  app.use(store);

  app.use(router);

  registerIcons(app);

  setUpContextMenu(app);

  await router.isReady();

  app.mount('#app');
}

setup();
