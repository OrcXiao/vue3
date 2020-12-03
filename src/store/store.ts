import {createStore} from 'vuex'
import axios from 'axios';

export interface UserProps {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId?: number
}

interface ImageProps {
  _id?: string;
  url?: string;
  createAd?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  createAd: string;
  column: string;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: {
      isLogin: true,
      name: 'OrcXiao',
      columnId: 1,
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id);
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid);
    },

  },
  mutations: {
    login(state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: 'OrcXiao'
      }
    },
    createPost(state, newPost) {
      state.posts.push(newPost);
    },
    fetchColumns(state, data) {
      state.columns = data.data.list;
    },
    fetchColumn(state, data) {
      state.columns = [data.data];
      console.log(state.columns);
    },
    fetchPosts(state, data) {
      state.posts = data.data.list;
    },
  },
  actions: {
    fetchColumns(context) {
      axios.get('/columns').then(res => {
        context.commit('fetchColumns', res.data);
      })
    },
    fetchColumn({commit}, cid) {
      axios.get(`/columns/${cid}`).then(res => {
        commit('fetchColumn', res.data)
      })
    },
    fetchPosts({commit}, cid) {
      axios.get(`/columns/${cid}/posts`).then(res => {
        commit('fetchPosts', res.data)
      })
    }
  }
});

export default store
