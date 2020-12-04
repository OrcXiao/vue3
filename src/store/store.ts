import {createStore, Commit} from 'vuex'
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
  token: string;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const {data} = await axios.get(url);
  commit(mutationName, data);
};

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const {data} = await axios.post(url, payload);
  commit(mutationName, data);
  return data
};

const store = createStore<GlobalDataProps>({
  state: {
    token: '',
    columns: [],
    posts: [],
    user: {
      isLogin: false,
      name: 'OrcXiao',
      columnId: 1,
    },
    loading: false,
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
    // login(state) {
    //   state.user = {
    //     ...state.user,
    //     isLogin: true,
    //     name: 'OrcXiao'
    //   }
    // },
    createPost(state, newPost) {
      state.posts.push(newPost);
    },
    fetchColumns(state, data) {
      state.columns = data.data.list;
    },
    fetchColumn(state, data) {
      state.columns = [data.data];
    },
    fetchPosts(state, data) {
      state.posts = data.data.list;
    },
    setLoading(state, data) {
      state.loading = data;
    },
    login(state, data) {
      state.token = data.data.token;
    }
  },
  actions: {
    fetchColumns({commit}) {
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchColumn({commit}, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({commit}, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    login({commit}, payload) {
      return postAndCommit('/user/login', 'login', commit, payload);
    }

  }
});

export default store
