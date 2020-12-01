import {createApp} from 'vue'
import App from './App.vue'
import router from './router/routers';

// @ts-ignore
import store from "./store/store.ts";

let app = createApp(App);
app.use(router)
app.use(store)
app.mount('#app');
