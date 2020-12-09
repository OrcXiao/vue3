<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <h2>{{biggerColumnsLen}}</h2>
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/logo.png" class="w-50" alt="">
          <h2 class="font-weight-light">随心写作,自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>

    <uploader
      :beforeUpload="beforeUpload"
      @file-uploaded="onFileUploaded"
      active="/upload">
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500">
      </template>
    </uploader>

    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed, onMounted} from 'vue'
  import {useStore} from 'vuex'
  import ColumnList from '@/components/ColumnList.vue'
  import {GlobalDataProps, ResponseType, ImageProps} from '@/store/store'
  import Uploader from "@/components/Uploader.vue";
  import createMessage from "@/components/createMessage";

  export default defineComponent({
    name: 'Home',
    components: {
      ColumnList,
      Uploader,

    },
    setup() {
      const store = useStore<GlobalDataProps>();
      const list = computed(() => store.state.columns);
      onMounted(() => {
        store.dispatch('fetchColumns')
      });
      const biggerColumnsLen = computed(() => store.getters.biggerColumnsLen);
      const beforeUpload = (file: File) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          createMessage('上传的图片只能是 JPG 格式!', 'error')
        }
        return isJPG
      };
      const onFileUploaded = (data: ResponseType<ImageProps>) => {
        createMessage(`上传图片ID ${data.data._id}`, 'success');
      };

      const clearFile = () => {

      };
      return {
        list,
        biggerColumnsLen,
        beforeUpload,
        onFileUploaded,
      }
    }
  })
</script>

<style scoped>

</style>
