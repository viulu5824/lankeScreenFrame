//Vue
new Promise(() => { });
import Vue from "vue";

//Mount（vue实例挂载公用属性方法）
import "./config/mount";
import "./filter/index";
import "./directive/index";

// Router
import router from "./config/router";
// Vuex
import store from "./store/index";

//Style
import "./theme/element/index.css";
import "./style/main/reset.scss";
import "./style/main/common.scss";
import "./style/main/main.scss";
import "./style/main/else-reset.scss";


//RootComponent 
import app from "_c/app.vue";
new Vue({
    render(c) {
        return c(app);
    },
    router,
    store,
}).$mount("#app");