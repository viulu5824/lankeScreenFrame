<template>
  <div class="login-container">
    <div @click="canvasCtrResize" ref="canvasCtr" id="canvas-ctr"></div>
    <transition
      mode="out-in"
      :appear="true"
      name="fadeInLeft"
      enter-active-class="flipInX"
    >
      <section class="login-modal animated">
        <div class="login-logo">
          <!-- <img src="../../image/login-logo.png" alt /> -->
        </div>
        <div class="login-form">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="70px"
            size="medium"
            label-position="top"
            :hide-required-asterisk="true"
            @submit.native.prevent="formSubmit('ruleForm', $event)"
          >
            <h3>账号登录</h3>
            <input
              class="not-autocomplete"
              type="text"
              name="username"
              autocomplete="on"
            />
            <input
              class="not-autocomplete"
              type="password"
              name="password"
              autocomplete="on"
            />

            <el-form-item prop="username">
              <el-input
                type="text"
                v-model.trim="ruleForm.username"
                placeholder="请输入账号"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                type="password"
                :show-password="true"
                v-model.trim="ruleForm.password"
                placeholder="请输入密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <div class="el-form-item mt40">
              <el-button
                :loading="loginLoad"
                style="width: 100%"
                size="medium"
                native-type="submit"
                type="primary"
                >确认登录</el-button
              >
            </div>
          </el-form>
        </div>
      </section>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  color: #333;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .login-logo {
    text-align: center;
    img {
      width: 328px;
      height: 110px;
    }
  }
  .login-modal {
    z-index: 1000;
    position: absolute;
    left: 50%;
    top: 15%;
    margin-left: -210px;
  }
  .login-form {
    margin-top: 32px;
    box-shadow: 0px 0px 20px 0px rgba(205, 205, 205, 0.5);
    width: 400px;
    padding: 25px 25px 65px;
    background-color: #fff;
  }
  h3 {
    font-weight: bold;
    font-size: 18px;
    padding-left: 12px;
    margin-bottom: 45px;
  }
}
#canvas-ctr {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 900;
  overflow: hidden;
}
</style>
<style lang="scss">
.login-form {
  .el-form-item {
    margin-bottom: 25px;
  }
  .el-input__inner {
    border: 0 none;
    border-radius: 0px;
    box-shadow: 0px 1px 0px 0px rgba(205, 205, 205, 0.5);
  }
  .el-input--medium .el-input__inner {
    height: 42px;
    line-height: 42px;
  }
  .el-form-item__error {
    padding-top: 7px;
    padding-left: 12px;
  }
}
</style>
<script>
import {debounce} from "lodash-es";
import Vue from "vue";
import { clearData } from "util/common";
import { Form, FormItem, Input } from "element-ui";
Vue.use(Form).use(FormItem).use(Input);
export default {
  data() {
    return {
      loginLoad: false,
      ruleForm: {
        username: null,
        password: null,
      },
      rules: {
        username: [
          { required: true, message: "请输入登录账号", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    formSubmit(formName, e) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    login: debounce(function () {
      this.loginLoad = true;
      this.$axios({
        method: "post",
        url: "/web/login",
        data: this.ruleForm,
        noToken: true,
        hasSuccessMsg: true,
        trans2queryStr: true,
      }).then(
        (res) => {
          console.log(res);
          if (res.data.code === 200) {
            //防止用户手动跳转login登录，在成功后清除一次数据
            clearData();
            localStorage.accessToken = res.data.data.webToken;
            this.$store.commit("accessToken", localStorage.accessToken);
            this.$router.push({
              path: "/",
            });
          }
          this.loginLoad = false;
        },
        (err) => {
          console.log(err);
          this.loginLoad = false;
        }
      );
    }, 150),
    //监听window改变
    canvasCtrResize: debounce(function (e) {
      const canvas = this.$refs.canvasCtr.children[0];
      canvas.width = this.$refs.canvasCtr.offsetWidth;
      canvas.height = this.$refs.canvasCtr.offsetHeight;
    }, 300),
  },
  created() {},
  mounted() {
    if (typeof requestAnimationFrame !== "undefined") {
      //等待主线js加载完成，开始加载
      import(/* webpackPrefetch: true */ "../../canvas/particle").then(
        (res) => {
          console.log(res);
          res.default(this.$refs.canvasCtr);
        }
      );
    }
    window.addEventListener("resize", this.canvasCtrResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.canvasCtrResize);
  },
};
</script>