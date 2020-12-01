<template>
  <div>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed} from 'vue'
  import {useStore} from 'vuex'
  import ColumnList from '@/components/ColumnList.vue'
  import {GlobalDataProps} from '@/store/store'

  export default defineComponent({
    name: 'Home',
    components: {
      ColumnList,
    },
    setup() {
      const store = useStore<GlobalDataProps>();
      console.log(store)
      const list = computed(() => store.state.columns)
      return {
        list
      }
    }
  })
</script>

<style scoped>

</style>
