
import store from "../store/index";
import { resetRouter } from "router";
import router from "router";

//清除项目所有内存、缓存数据
export function clearData(clearCache) {
    store.commit("resetDynamicData");
    resetRouter();
    if (clearCache) {
        localStorage.clear();
        sessionStorage.clear();
    }
}
//重新登录
export function reLogin() {
    router.push({
        name: "login"
    })
}