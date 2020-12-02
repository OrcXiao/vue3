<template>
  <div id="app" class="container">
    <global-header :user="currentUser"></global-header>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">2020 者也</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, computed} from 'vue';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import ColumnList, {ColumnProps} from "@/components/ColumnList.vue";
  import GlobalHeader from '@/components/GlobalHeader.vue';
  import ValidateInput from "@/components/ValidateInput.vue";
  import ValidateForm from "@/components/ValidateForm.vue";
  import {useStore} from 'vuex'

  const testData: ColumnProps[] = [
    {
      id: 1,
      avatar: 'https://shigongbang.oss-cn-hangzhou.aliyuncs.com/machine/610000/20201131610591716417736.jpg',
      title: 'test1的专栏',
      description: 'test1的专栏, 这是一段又有趣的专栏'
    },
    {
      id: 2,
      avatar: 'https://shigongbang.oss-cn-hangzhou.aliyuncs.com/machine/610000/20201131610591716417736.jpg',
      title: 'test2的专栏',
      description: 'test2的专栏, 这是一段又有趣的专栏'
    },
    {
      id: 3,
      avatar: 'https://shigongbang.oss-cn-hangzhou.aliyuncs.com/machine/610000/20201131610591716417736.jpg',
      title: 'test2的专栏',
      description: 'test2的专栏, 这是一段又有趣的专栏'
    },
    {
      id: 4,
      title: 'test2的专栏',
      description: 'test2的专栏, 这是一段又有趣的专栏'
    },
  ];
  export default defineComponent({
    name: 'App',
    components: {
      // eslint-disable-next-line vue/no-unused-components
      ColumnList,
      GlobalHeader,
      // eslint-disable-next-line vue/no-unused-components
      ValidateInput,
      // eslint-disable-next-line vue/no-unused-components
      ValidateForm,
    },
    setup() {
      const emailVal = ref('');
      const passVal = ref('');
      const store = useStore();
      const currentUser = computed(() => store.state.user);
      const onFormSubmit = (result: boolean) => {
        console.log(1234, result);
      };
      return {
        list: testData,
        currentUser,
        emailVal,
        passVal,
        onFormSubmit,
      }
    }
  })
</script>

<style>

</style>
