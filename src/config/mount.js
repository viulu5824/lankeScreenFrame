//vue全局挂载配置文件
import Vue from "vue";
import config from "./config";
import verify from "util/verify";
import common from "util/common";
import request from "util/request";
import { assign } from "lodash-es";
import { Button, Loading, MessageBox, Notification, Message } from "element-ui";

Vue.use(Button).use(Loading).use(MessageBox.name).use(Message.name).use(Notification.name);
Vue.use({
    install(Vue) {
        Vue.prototype.pendingRequestArr = [];
        Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$prompt = MessageBox.prompt;
        Vue.prototype.$notify = Notification;
        Vue.prototype.$message = Message;
        Vue.prototype.$loading = Loading.service;
        assign(Vue.prototype, { ...config, verify, ...common, $request: request })
    }
})