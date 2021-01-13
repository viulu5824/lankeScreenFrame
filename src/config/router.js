//vueRouter配置文件
import Vue from "vue";
import VueRouter from "vue-router"
import config from "./config";
import store from "store";
Vue.use(VueRouter);

//配置路由信息
const createRouter = () => new VueRouter({
  mode: config.routerMode,
  base: config.baseUrl,
  routes: [
    {
      path: "/",
      name: "",
      meta: {
        title: "首页",
      },
      component: () => import( /* webpackChunkName: "index" */ "_c/main/index.vue"),

    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "登录",
      },
      component: () => import( /* webpackChunkName: "login" */ "_c/main/login.vue"),
    },
    {
      path: "/*",
      name: "404",
      meta: {
        title: "404",
      },
      component: () => import( /* webpackChunkName: "404" */ "_c/error/404.vue"),
    }
  ],
  linkActiveClass: "router-active"
})

//重置路由数据（一般权限路由重新登录需要此项操作）
const resetRouter = () => router && (router.matcher = createRouter().matcher);
const router = createRouter();

//全局路由钩子
router.beforeEach((to, from, next) => {
  console.log("from=====>", from, "\n", "to=====>", to);
  //切换路由清除 pedding请求
  Vue.prototype.pendingRequestArr = Vue.prototype.pendingRequestArr.filter(e => {
    Boolean(e.cancelRequest())
    return e.cancelRequest() && e;
  })
  //切换路由修改HTML title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  //Vuex存储当前路由
  store.commit("currentRoute", to.name);
  return next();
});

export { resetRouter };
export default router;