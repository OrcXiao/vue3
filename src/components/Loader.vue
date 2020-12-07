<template>
  <teleport to="#back">
    <div
      :style="{backgroundColor: background || ''}"
      class="d-flex justify-content-center align-items-center h-100 loader-container">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status"></div>
        <p v-if="text" class="text-primary small">{{text}}</p>
      </div>
    </div>
  </teleport>

</template>

<script lang="ts">
  import {defineComponent, onUnmounted} from 'vue'
  import useDOMCreate from "@/hooks/useDOMCtreate";

  export default defineComponent({
    name: "Loader",
    props: {
      text: {
        type: String
      },
      background: {
        type: String
      }
    },
    setup() {
      useDOMCreate('back')
    }
  })
</script>

<style scoped>
  .loader-container {
    background: rgba(255, 255, 255, 0.5);
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
  }
</style>
