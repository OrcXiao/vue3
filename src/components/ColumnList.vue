<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="column in columnList" :key="column.id">
      <div class="card  h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            class="img-item rounded-circle border border-light my-3"
            :src="column.avatar && column.avatar.url"
            :alt="column.title">
          <h5 class="card-text">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, PropType, computed} from 'vue'
  import {ColumnProps} from '@/store/store.ts';

  export default defineComponent({
    name: 'ColumnList',
    props: {
      list: {
        type: Array as PropType<ColumnProps[]>,
        required: true,
      }
    },
    setup(props) {
      const columnList = computed(() => {
        return props.list.map(column => {
          if (!column.avatar) {
            column.avatar = {
              url: require('@/assets/logo.png')
            }
          }else {
            column.avatar.url = column.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
          }
          return column
        })
      });

      return {
        columnList
      }

    }

  })
</script>

<style scoped>
  .img-item {
    width: 100px;
    height: 100px;
  }
</style>
