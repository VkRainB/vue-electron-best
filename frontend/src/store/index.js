import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const store = createPinia();

store.use(piniaPluginPersistedstate);

export default store;

export * from './modules/design';
export * from './modules/keepAlive';
export * from './modules/local';
export * from './modules/recordBread';
