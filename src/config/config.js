const NODE_ENV = process.env.NODE_ENV;
switch (NODE_ENV) {
    case "production":
        window.apiUrl = "https://smzsapi.shimingbao.net:18980/";
        break;
    default:
        window.apiUrl = "https://yqfk.shimingbao.net:18980/";
        break;
}
/**
 * @param  requestInfoObj:接口地址对象
 * @param  baseUrl:vueRouter baseUrl配置
 * @param  routerMode:vueRouter 路由模式
 * @param  responseCodeObj:响应信息区分
 * @param  imgUrl:线上图片拼接地址前缀
 * @param  openRootUrl:多页面跳转地址前缀
 */
const config = {
    development: {
        requestInfoObj: {
            "api": { url: "http://localhost:5866/api/", successCodeArr: [5002, 1053, 8060, 8057], msgField: "statusMsg", codeField: "statusCode" },
        },
        baseUrl: "/",
        routerMode: "history",
        openRootUrl: 'https://yqfk.shimingbao.net/',
        imgUrl: "/"
    },
    test: {
        requestInfoObj: {
            "api": { url: "https://yqfk.shimingbao.net:18980/", successCodeArr: [5002, 1053, 8060, 8057], msgField: "statusMsg", codeField: "statusCode" },
        },
        baseUrl: "/",
        routerMode: "history",
        openRootUrl: '/',
        imgUrl: "/"
    },
    production: {
        requestInfoObj: {
            "api": { url: "https://sycjapi.shimingbao.net:18980/", successCodeArr: [5002, 1053, 8060, 8057], msgField: "statusMsg", codeField: "statusCode" },
        },
        baseUrl: "/",
        routerMode: "history",
        openRootUrl: '/',
        imgUrl: "/"
    },
}
export default config[NODE_ENV];