<template>
  <div class="dropdown" ref="dropdownRef">
    <a class="btn btn-outline-light my-2 dropdown-toggle" href="#" @click.prevent="toggleOpen">
      {{title}}
    </a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, watch} from 'vue'
  import useClickOutside from "@/hooks/useClickOutside";

  export default defineComponent({
    name: 'Dropdown',
    props: {
      title: {
        type: String,
        required: true,
      }
    },
    setup() {
      const isOpen = ref(false);
      const dropdownRef = ref<null | HTMLElement>(null);
      const toggleOpen = () => {
        isOpen.value = !isOpen.value;
      };
      const isClickOutSide = useClickOutside(dropdownRef);
      watch(isClickOutSide, () => {
          if (isOpen.value && isClickOutSide.value) {
            isOpen.value = false
          }
        }
      );

      return {
        dropdownRef,
        isOpen,
        toggleOpen,
      }
    }
  })
</script>

<style scoped>

</style>
