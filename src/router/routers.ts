import {createRouter, createWebHistory} from 'vue-router';
import store from "@/store/store";
import axios from "axios";

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import ColumnDetail from '@/views/ColumnDetail.vue';
import CreatePost from '@/views/CreatePost.vue';
import Signup from "@/views/Signup.vue";

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: {
        requiredLogin: true
      }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },

  ]
});
router.beforeEach((to, form, next) => {
  const {user, token} = store.state;
  const {requiredLogin, redirectAlreadyLogin} = to.meta;
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(() => {
        store.commit('logout');
        next('login');
      })

    } else {
      if (requiredLogin) {
        next('/')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
});
export default router
