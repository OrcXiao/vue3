<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
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
  import ValidateForm from '../components/ValidateForm.vue'
  import ValidateInput, {RulesProp} from '../components/ValidateInput.vue'
  import {useRouter} from 'vue-router'
  import {useStore} from 'vuex'
  import {PostProps} from "@/testData";

  export default defineComponent({
    name: "CreatePost",
    components: {
      ValidateForm,
      ValidateInput,
    },
    setup(props, context) {
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

      const onFormSubmit = (result: boolean) => {
        if (result) {
          const {columnId} = store.state.user;
          if (columnId) {
            const newPost: PostProps = {
              id: new Date().getTime(),
              title: titleVal.value,
              content: contentVal.value,
              columnId,
              createdAt: new Date().toLocaleString()
            };
            store.commit('createPost', newPost);
            router.push({name: 'column', params: {id: columnId}})
          }
        }
      };

      return {
        titleVal,
        titleRules,
        contentVal,
        contentRules,
        onFormSubmit
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
