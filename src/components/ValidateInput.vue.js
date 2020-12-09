import { defineComponent, reactive, onMounted } from 'vue';
import { emitter } from './ValidateForm.vue';
var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
export default defineComponent({
    name: 'ValidateInput',
    props: {
        rules: Array,
        modelValue: String,
        tag: {
            type: String,
            default: 'input'
        }
    },
    inheritAttrs: false,
    setup: function (props, context) {
        var inputRef = reactive({
            val: props.modelValue || '',
            error: false,
            message: '',
        });
        var updateValue = function (e) {
            var targetValue = e.target.value;
            inputRef.val = targetValue;
            context.emit('update:modelValue', targetValue);
        };
        var validateInput = function () {
            if (props.rules) {
                var allPassed = props.rules.every(function (rule) {
                    var passed = true;
                    inputRef.message = rule.message;
                    switch (rule.type) {
                        case 'required':
                            passed = (inputRef.val.trim() !== '');
                            break;
                        case 'email':
                            passed = emailReg.test(inputRef.val);
                            break;
                        case 'password':
                            passed = (inputRef.val.length >= 6);
                            break;
                        case 'custom':
                            passed = rule.validate ? rule.validate() : true;
                            break;
                        default:
                            break;
                    }
                    return passed;
                });
                inputRef.error = !allPassed;
                return allPassed;
            }
            else {
                return true;
            }
        };
        onMounted(function () {
            emitter.emit('from-item-created', validateInput);
        });
        return {
            inputRef: inputRef,
            validateInput: validateInput,
            updateValue: updateValue
        };
    }
});
