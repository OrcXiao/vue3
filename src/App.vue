<template>
  <div id="app" class="container">
    <global-header :user="currentUser"></global-header>

    <!--
        <validate-form @form-submit="onFormSubmit">
          <div class="mb-3">
            <label class="form-label">邮箱地址</label>
            <validate-input
              type="text"
              :rules="emailRules"
              placeholder="请输入邮箱"
              v-model="emailVal">
            </validate-input>
            <div>{{emailVal}}</div>
          </div>

          <div class="mb-3">
            <label class="form-label">登录密码</label>
            <validate-input
              type="password"
              :rules="passRules"
              placeholder="请输入密码"
              v-model="passVal">
            </validate-input>
          </div>
          <template #submit>
            <span class="btn btn-danger">
              提交
            </span>
          </template>
        </validate-form>
    -->
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
  import {defineComponent, ref} from 'vue';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import ColumnList, {ColumnProps} from "@/components/ColumnList.vue";
  import GlobalHeader, {UserProps} from '@/components/GlobalHeader.vue';
  import ValidateInput, {RulesProp} from "@/components/ValidateInput.vue";
  import ValidateForm from "@/components/ValidateForm.vue";

  const currentUser: UserProps = {
    isLogin: false,
    name: ''
  };

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

  const emailRules: RulesProp = [
    {
      type: 'required',
      message: '电子邮箱不能为空',
    },
    {
      type: 'email',
      message: '请输入正确的电子邮箱',
    },
  ];
  const passRules: RulesProp = [
    {
      type: 'required',
      message: '密码不能为空',
    },
    {
      type: 'password',
      message: '至少输入6位字符',
    },
  ];
  export default defineComponent({
    name: 'App',
    components: {
      ColumnList,
      GlobalHeader,
      ValidateInput,
      ValidateForm,
    },
    setup() {
      let emailVal = ref('');
      let passVal = ref('');

      const onFormSubmit = (result: Boolean) => {
        console.log(1234, result);
      };
      return {
        list: testData,
        currentUser,
        emailRules,
        passRules,
        emailVal,
        passVal,
        onFormSubmit,
      }
    }
  })
</script>

<style>

</style>
