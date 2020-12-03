import {createApp} from 'vue'
import App from './App.vue'
import router from './router/routers';
import axios from 'axios';
// @ts-ignore
import store from "./store/store.ts";

axios.defaults.baseURL = 'http://apis.imooc.com/api/';

axios.interceptors.request.use(config => {
  config.params = {...config.params, icode: '7A608BB9517AD641'};
  return config
});

let app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
