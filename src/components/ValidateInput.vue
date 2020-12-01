<template>
  <div class="validate-input-container pb-3">
    <input
      v-bind="$attrs"
      type="text"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.value"
      @blur="validateInput"
      @input="updateValue"
      class="form-control">
    <span v-if="inputRef.error" class="invalid-feedback">
      {{inputRef.message}}
    </span>
  </div>
</template>

<script lang="ts">
  import {defineComponent, reactive, PropType, onMounted} from 'vue'
  import {emitter} from './ValidateForm.vue'

  interface RuleProp {
    type: 'required' | 'email' | 'password';
    message: string;
  }

  export type RulesProp = RuleProp[];

  const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

  export default defineComponent({
    name: 'ValidateInput',
    props: {
      rules: Array as PropType<RulesProp>,
      modelValue: String
    },
    inheritAttrs: false,
    setup(props, context) {
      const inputRef = reactive({
        value: props.modelValue || '',
        error: false,
        message: '',
      });
      const updateValue = (e: KeyboardEvent) => {
        const targetValue = (e.target as HTMLInputElement).value;
        inputRef.value = targetValue;
        context.emit('update:modelValue', targetValue);
      };
      const validateInput = () => {
        if (props.rules) {
          const allPassed = props.rules.every((rule) => {
            let passed = true;
            inputRef.message = rule.message;
            switch (rule.type) {
              case 'required':
                passed = (inputRef.value.trim() !== '');
                break;
              case 'email':
                passed = emailReg.test(inputRef.value);
                break;
              case 'password':
                passed = (inputRef.value.length >= 6);
                break;
              default:
                break;
            }
            return passed
          });
          inputRef.error = !allPassed;
          return allPassed;
        } else {
          return true
        }
      };
      onMounted(() => {
        emitter.emit('from-item-crated', validateInput)
      });
      return {
        inputRef,
        validateInput,
        updateValue
      }
    }
  });
</script>

<style scoped>

</style>