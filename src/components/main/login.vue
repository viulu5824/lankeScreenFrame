<template>
  <section class="login-container">
    登录页面
  </section>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      loginFormModel: {
        mobile: null,
        code: null,
      },
    };
  },
  methods: {
    //登录提交表单
    loginSubmit() {
      console.log(this.loginFormModel);
      this.$router.push({ path: "/" });
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.login-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loginForm {
  padding: 30px 0 60px;
  border: 1px solid #dfdfdf;
  border-radius: 6px;
  border-width: 2px;
  width: 88%;
}
</style>