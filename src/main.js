import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createPinia } from 'pinia';
import './style.css';

createApp(App).use(router).mount('#app');
const pinia = createPinia();
App.use(pinia);
