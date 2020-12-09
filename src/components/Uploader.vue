<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload">
      <slot
        v-if="fileStatus === 'loading'"
        name="loading">
        <button class="btn btn-primary">正在上传...</button>
      </slot>
      <slot
        v-else-if="fileStatus === 'success'"
        :uploadedData="uploadedData"
        name="uploaded">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot
        v-else
        name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <button @click="clearImg" v-if="fileStatus === 'success'" type="button">取消图片</button>
    <input
      @change="handleFileChange"
      class="file-input d-none"
      ref="fileInput"
      type="file">
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, PropType} from 'vue'
  import axios from 'axios'

  type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
  type CheckFunction = (file: File) => boolean
  export default defineComponent({
    props: {
      active: {
        type: String,
        required: true,
      },
      beforeUpload: {
        type: Function as PropType<CheckFunction>
      }
    },
    emits: ['file-uploaded', 'file-upload-error', 'clear-file'],
    setup(props, context) {
      const fileInput = ref<null | HTMLInputElement>(null);
      const fileStatus = ref<UploadStatus>('ready');
      const uploadedData = ref();
      const triggerUpload = () => {
        if (fileInput.value) {
          fileInput.value.click();
        }
      };

      const handleFileChange = (e: Event) => {
        const currentTarget = e.target as HTMLInputElement;
        if (currentTarget.files) {
          const file = Array.from(currentTarget.files);
          if (props.beforeUpload) {
            const result = props.beforeUpload(file[0]);
            if (!result) return
          }

          fileStatus.value = "loading";
          const formData = new FormData();
          formData.append('file', file[0]);
          axios.post(props.active, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            context.emit('file-uploaded', res.data);
            uploadedData.value = res.data;
            fileStatus.value = 'success';
          }).catch(err => {
            context.emit('file-upload-error', {err});
            fileStatus.value = 'error';
          }).finally(() => {
            if (fileInput.value) {
              fileInput.value.value = '';
            }
          })
        }
      };

      const clearImg = () => {
        fileStatus.value = 'ready';
        if (fileInput.value) {
          fileInput.value.value = '';
        }
      };
      return {
        fileInput,
        fileStatus,
        uploadedData,
        triggerUpload,
        handleFileChange,
        clearImg,
      }
    }
  })
</script>

<style scoped>

</style>
