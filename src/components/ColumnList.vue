<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="(column, index) in columnList" :key="index">
      <div class="card  h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            class="img-item rounded-circle border border-light w-25 my-3"
            :src="column.avatar"
            :alt="column.title">
          <h5 class="card-text">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, PropType, computed} from 'vue'

  export interface ColumnProps {
    id: number;
    title: string;
    avatar?: string;
    description: string;
  }

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
        return props.list.map(item => {
          if (!item.avatar) {
            item.avatar = require('@/assets/logo.png');
          }
          return item
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
