import { createPinia } from 'pinia';
/** 持久化工具 */
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
