<template>
  <li
    class="dropdown-item"
    :class="{'is-disabled': disabled}"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: 'DropdownItem',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      }
    },

  })
</script>

<style scoped>
  .dropdown-item.is-disabled *{
    pointer-events: none;
    color: #6c757d !important;
    background-color: transparent;
  }
</style>
