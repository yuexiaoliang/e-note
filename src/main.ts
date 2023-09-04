import { createApp } from 'vue';
import 'reset.css';
import 'github-markdown-css/github-markdown-light.css'

import router from '@/router';
import App from '@/App.vue';

import '@/styles/base.scss';

const app = createApp(App);
app.use(router);
app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'));
