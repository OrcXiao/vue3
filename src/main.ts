import {createApp} from 'vue'
import App from './App.vue'
import router from './router/routers';
import axios from 'axios';

import store from "@/store/store.ts";

axios.defaults.baseURL = 'http://apis.imooc.com/api/';

axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = {...config.data, icode: '7A608BB9517AD641'}
  } else {
    config.params = {...config.params, icode: '7A608BB9517AD641'};
  }
  store.commit('setLoading', true);
  return config
});

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false);
  }, 2000);
  return config
});
let app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');



