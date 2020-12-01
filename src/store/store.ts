import {createStore} from 'vuex'
import {testData, testPosts, ColumnProps, PostProps} from '@/testData.ts'

export interface UserProps {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId?: number
}

export interface GlobalDataProps {
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps,
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: true,
      name: 'OrcXiao',
      columnId: 1,
    }
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
    }
  },
  getters: {
    biggerColumnsLen(state) {
      state.columns.filter(c => c.id > 2).length;
    }
  }
});

export default store
