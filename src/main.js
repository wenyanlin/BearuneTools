import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import router from './router';
import VueLazyload from 'vue-lazyload'
import loadimage from '@/assets/background-light.webp';
import { createMetaManager } from 'vue-meta';

const metaManager = createMetaManager();
const app = createApp(App)

app.use(router);
app.use(VueLazyload, {
    preLoad: 1.3,
    // error: errorimage,
    loading: loadimage,
    attempt: 1
});
app.use(metaManager);
app.mount('#app');



