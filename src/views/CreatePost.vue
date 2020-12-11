<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader
      @file-uploaded="handleFileUploaded"
      :beforeUpload="uploadCheck"
      class="d-flex justify-content-center align-items-center bg-light  table-secondary w-100 my-4"
      active="/upload">
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status"></div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" alt="">
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题 :</label>
        <validate-input
          :rule="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          tag="input"
          type="text">
        </validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情 :</label>
        <validate-input
          :rule="contentRules"
          tag="textarea"
          row="20"
          v-model="contentVal"
          placeholder="请输入文章详情">
        </validate-input>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发布文章</button>
      </template>
    </validate-form>
    <div></div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, computed} from 'vue';
  import ValidateForm from '../components/ValidateForm.vue';
  import ValidateInput, {RulesProp} from '../components/ValidateInput.vue';
  import {useRouter} from 'vue-router';
  import {useStore} from 'vuex';
  import {PostProps, ResponseType, ImageProps} from "@/store/store";
  import Uploader from "@/components/Uploader.vue";
  import {beforeUploadCheck} from '@/helper/helper.ts';
  import createMessage from "@/components/createMessage";

  export default defineComponent({
    components: {
      ValidateForm,
      ValidateInput,
      Uploader,
    },
    setup(props, context) {
      let imageId: string = '';
      const titleVal = ref('');
      const contentVal = ref('');
      const router = useRouter();
      const store = useStore();
      const titleRules: RulesProp = [
        {type: 'required', message: '文章标题不能为空'}
      ];
      const contentRules: RulesProp = [
        {type: 'required', message: '文章内容不能为空'}
      ];
      const handleFileUploaded = (data: ResponseType<ImageProps>) => {
        if (data.data._id) {
          imageId = data.data._id
        }
      };

      const onFormSubmit = (result: boolean) => {
        if (result) {
          const {column, _id} = store.state.user;
          if (column) {
            const newPost: PostProps = {
              title: titleVal.value,
              content: contentVal.value,
              column,
              author: _id,
            };
            if (imageId) {
              newPost.image = imageId;
            }
            store.dispatch('createPost', newPost).then(() => {
              createMessage('发表成功, 2秒后跳转到文章', 'success', 2000);
              setTimeout(() => {
                router.push({name: 'column', params: {id: column}})
              }, 2000)
            });
          }
        }
      };

      const uploadCheck = (file: File) => {
        const result = beforeUploadCheck(file, {format: ['image/jpeg', 'image/png'], size: 1});
        const {passed, error} = result;
        if (error === 'format') {
          createMessage('上传图片只能是 JPG/PNG 格式!', 'error');
        }
        if (error === 'size') {
          createMessage('上传图片大小不能超过 1Mb', 'error');
        }
        return passed
      };

      return {
        titleVal,
        titleRules,
        contentVal,
        contentRules,
        onFormSubmit,
        uploadCheck,
        handleFileUploaded,
      }
    }
  })
</script>

<style>
  .create-post-page .file-upload-container {
    height: 200px;
    cursor: pointer;
    overflow: hidden;
  }

  .create-post-page .file-upload-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid #ececec;
  }

  .uploaded-area {
    position: relative;
  }

  .uploaded-area:hover h3 {
    display: block;
  }

  .uploaded-area h3 {
    display: none;
    position: absolute;
    color: #999;
    text-align: center;
    width: 100%;
    top: 50%;
  }
</style>
