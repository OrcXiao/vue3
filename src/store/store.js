import { __assign, __awaiter, __generator } from "tslib";
import { createStore } from 'vuex';
import axios from 'axios';
var getAndCommit = function (url, mutationName, commit) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get(url)];
            case 1:
                data = (_a.sent()).data;
                commit(mutationName, data);
                return [2 /*return*/];
        }
    });
}); };
var postAndCommit = function (url, mutationName, commit, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.post(url, payload)];
            case 1:
                data = (_a.sent()).data;
                commit(mutationName, data);
                return [2 /*return*/, data];
        }
    });
}); };
var store = createStore({
    state: {
        error: { status: false },
        token: localStorage.getItem('token') || '',
        columns: [],
        posts: [],
        user: {
            isLogin: false,
        },
        loading: false,
    },
    getters: {
        getColumnById: function (state) { return function (id) {
            return state.columns.find(function (c) { return c._id === id; });
        }; },
        getPostsByCid: function (state) { return function (cid) {
            return state.posts.filter(function (post) { return post.column === cid; });
        }; },
    },
    mutations: {
        createPost: function (state, newPost) {
            state.posts.push(newPost);
        },
        fetchColumns: function (state, data) {
            state.columns = data.data.list;
        },
        fetchColumn: function (state, data) {
            state.columns = [data.data];
        },
        fetchPosts: function (state, data) {
            state.posts = data.data.list;
        },
        setError: function (state, data) {
            state.error = data;
        },
        setLoading: function (state, data) {
            state.loading = data;
        },
        fetchCurrentUser: function (state, data) {
            state.user = __assign({ isLogin: true }, data.data);
        },
        login: function (state, data) {
            var token = data.data.token;
            state.token = token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common.Authorization = "Bearer " + token;
        },
    },
    actions: {
        fetchColumns: function (_a) {
            var commit = _a.commit;
            getAndCommit('/columns', 'fetchColumns', commit);
        },
        fetchColumn: function (_a, cid) {
            var commit = _a.commit;
            getAndCommit("/columns/" + cid, 'fetchColumn', commit);
        },
        fetchPosts: function (_a, cid) {
            var commit = _a.commit;
            getAndCommit("/columns/" + cid + "/posts", 'fetchPosts', commit);
        },
        fetchCurrentUser: function (_a) {
            var commit = _a.commit;
            getAndCommit('/user/current', 'fetchCurrentUser', commit);
        },
        login: function (_a, payload) {
            var commit = _a.commit;
            return postAndCommit('/user/login', 'login', commit, payload);
        },
        loginAndFetch: function (_a, data) {
            var dispatch = _a.dispatch;
            return dispatch('login', data).then(function () {
                return dispatch('fetchCurrentUser');
            });
        }
    }
});
export default store;
//# sourceMappingURL=store.js.map