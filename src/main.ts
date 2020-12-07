import {createApp} from 'vue'
import App from './App.vue'
import router from './router/routers';
import axios from 'axios';

import store from "@/store/store.ts";

axios.defaults.baseURL = 'http://apis.imooc.com/api/';

axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: '7A608BB9517AD641' };
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', '7A608BB9517AD641');
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: '7A608BB9517AD641' };
  }
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



