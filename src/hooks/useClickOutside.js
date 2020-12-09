import { ref, onMounted, onUnmounted } from 'vue';
var useClickOutSide = function (elementRef) {
    var isClickOutSide = ref(false);
    var handle = function (e) {
        if (elementRef.value) {
            if (elementRef.value.contains(e.target)) {
                isClickOutSide.value = false;
            }
            else {
                isClickOutSide.value = true;
            }
        }
    };
    onMounted(function () {
        document.addEventListener('click', handle, false);
    });
    onUnmounted(function () {
        document.removeEventListener('click', handle, false);
    });
    return isClickOutSide;
};
export default useClickOutSide;
//# sourceMappingURL=useClickOutside.js.map