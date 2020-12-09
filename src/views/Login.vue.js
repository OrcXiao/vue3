import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ValidateInput from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
export default defineComponent({
    name: 'Login',
    components: {
        ValidateInput: ValidateInput,
        ValidateForm: ValidateForm
    },
    setup: function () {
        var emailVal = ref('');
        var router = useRouter();
        var store = useStore();
        var emailRules = [
            { type: 'required', message: '电子邮箱地址不能为空' },
            { type: 'email', message: '请输入正确的电子邮箱格式' }
        ];
        var passwordVal = ref('');
        var passwordRules = [
            { type: 'required', message: '密码不能为空' }
        ];
        var onFormSubmit = function (result) {
            if (result) {
                var payload = {
                    email: emailVal.value,
                    password: passwordVal.value,
                };
                store.dispatch('loginAndFetch', payload).then(function (data) {
                    router.push('/');
                }).catch(function (err) {
                    console.log(err);
                });
            }
        };
        return {
            emailRules: emailRules,
            emailVal: emailVal,
            passwordVal: passwordVal,
            passwordRules: passwordRules,
            onFormSubmit: onFormSubmit
        };
    }
});
//# sourceMappingURL=Login.vue.js.map