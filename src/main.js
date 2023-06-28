import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert2/dist/sweetalert2.css'
import 'bootstrap';
import './style.css';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
