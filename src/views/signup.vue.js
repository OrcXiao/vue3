import { defineComponent, reactive } from 'vue';
import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput from "@/components/ValidateInput.vue";
export default defineComponent({
    name: "signup",
    components: {
        ValidateForm: ValidateForm,
        ValidateInput: ValidateInput,
    },
    setup: function () {
        var formData = reactive({
            email: '',
            nickName: '',
            password: '',
            repeatPassword: '',
        });
        var emailRules = [
            { type: 'required', message: '电子邮箱地址不能为空' },
            { type: 'email', message: '请输入正确的邮箱格式' },
        ];
        var nickRules = [
            { type: 'required', message: '昵称不能为空' },
        ];
        var passwordRules = [
            { type: 'required', message: '密码不能为空' }
        ];
        var repeatPasswordRules = [
            { type: 'required', message: '重复密码不能为空' },
            {
                type: 'custom',
                validate: function () {
                    return formData.password === formData.repeatPassword;
                },
                message: '密码不相同',
            }
        ];
        return {
            formData: formData,
            emailRules: emailRules,
            nickRules: nickRules,
            passwordRules: passwordRules,
            repeatPasswordRules: repeatPasswordRules,
        };
    }
});
//# sourceMappingURL=signup.vue.js.map