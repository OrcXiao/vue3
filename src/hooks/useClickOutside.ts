import {ref, onMounted, onUnmounted, Ref} from 'vue';

const useClickOutSide = (elementRef: Ref<any | HTMLElement>) => {
  const isClickOutSide = ref(false);
  const handle = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutSide.value = false;
      } else {
        isClickOutSide.value = true;
      }
    }

  };

  onMounted(() => {
    document.addEventListener('click', handle, false)
  });
  onUnmounted(() => {
    document.removeEventListener('click', handle, false)
  });

  return isClickOutSide
};

export default useClickOutSide
