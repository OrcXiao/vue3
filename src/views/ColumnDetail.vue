<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.url" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script>
  import { defineComponent, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import PostList from '@/components/PostList'
  import { GlobalDataProps, ColumnProps } from '@/store/store.ts'
  import { generateFitUrl } from '@/helper/helper'

  export default defineComponent({
    name: 'ColumnDetail',
    components: {
      PostList
    },
    setup () {
      const route = useRoute()
      const store = useStore()
      const currentId = route.params.id

      onMounted(() => {
        store.dispatch('fetchColumn', currentId)
        store.dispatch('fetchPosts', currentId)
      })
      const column = computed(() => {
        const selectColumn = store.getters.getColumnById(currentId);
          if (selectColumn) {
          generateFitUrl(selectColumn, 100, 100)
        }
        return selectColumn
      })
      const list = computed(() => store.getters.getPostsByCid(cu-rrentId))
      return {
        column,
        list,
      }
    }
  })
</script>

<style scoped>

</style>
