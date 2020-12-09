import { defineComponent, computed, onMounted, watch } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalHeader from '@/components/GlobalHeader.vue';
import { useStore } from 'vuex';
import Loader from "@/components/Loader.vue";
// import Message from "@/components/Message.vue";
import createMessage from "@/components/createMessage.ts";
import axios from 'axios';
export default defineComponent({
    name: 'App',
    components: {
        GlobalHeader: GlobalHeader,
        Loader: Loader,
    },
    setup: function () {
        var store = useStore();
        var currentUser = computed(function () { return store.state.user; });
        var isLoading = computed(function () { return store.state.loading; });
        var token = computed(function () { return store.state.token; });
        var error = computed(function () { return store.state.error; });
        watch(function () { return error.value.status; }, function () {
            var _a = error.value, status = _a.status, message = _a.message;
            if (status && message) {
                createMessage(message, 'error');
            }
        });
        onMounted(function () {
            if (!currentUser.value.isLogin && token.value) {
                axios.defaults.headers.common.Authorization = "Bearer " + token.value;
                store.dispatch('fetchCurrentUser');
            }
        });
        return {
            currentUser: currentUser,
            isLoading: isLoading,
            error: error
        };
    }
});
//# sourceMappingURL=App.vue.js.map