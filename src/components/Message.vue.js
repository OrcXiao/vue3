import { defineComponent, ref } from 'vue';
import useDOMCreate from "@/hooks/useDOMCtreate";
export default defineComponent({
    name: "Message",
    props: {
        message: String,
        type: {
            type: String,
            default: 'default',
        }
    },
    emits: ['close-message'],
    setup: function (props, context) {
        useDOMCreate('message');
        var isVisible = ref(true);
        var classObject = {
            'alert-success': props.type === 'success',
            'alert-danger': props.type === 'error',
            'alert-primary': props.type === 'default'
        };
        var hide = function () {
            isVisible.value = false;
            context.emit('close-message', true);
        };
        return {
            isVisible: isVisible,
            classObject: classObject,
            hide: hide,
        };
    }
});
//# sourceMappingURL=Message.vue.js.map