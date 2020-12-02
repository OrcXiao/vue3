<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">submit</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
  import {defineComponent, onUnmounted} from 'vue'
  import mitt from 'mitt'

  type ValidateFunc = () => boolean;
  export const emitter = mitt();
  export default defineComponent({
    name: 'ValidateForm',
    emits: ['form-submit'],
    setup(props, context) {
      let funcArr: ValidateFunc[] = [];
      const submitForm = () => {
        const result = funcArr.map(func => func()).every(result => result);
        context.emit('form-submit', result);
      };

      const callback = (func: any) => {
        funcArr.push(func);
      };

      emitter.on('from-item-crated', callback);

      onUnmounted(() => {
        emitter.off('from-item-crated', callback);
        funcArr = [];
      });
      return {
        submitForm
      }
    }

  })
</script>

<style scoped>

</style>
