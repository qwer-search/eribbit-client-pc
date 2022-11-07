import axios from "axios";
import store from "@/store";
import router from "@/router";

// 1.创建新的axios实例

// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'

const instance = axios.create({
    // axios的一些配置，baseURL timeout
    baseURL,
    timeout: 5000
})

// 2.请求拦截器，如有token进行头部携带
instance.interceptors.request.use(config => {
    // 拦截业务逻辑
    // 进行请求配置的修改
    // 如果本地有token就在头部携带
    // 1.获取用户信息对象
    const { profile } = store.state.user
    // 2.判断是否有token
    console.log(profile.token);
    if (profile.token) {
        // 3.设置token
        config.headers.Authorization = `Bearer ${profile.token}`

    }

    return config

}, err => {
    return Promise.reject(err)
})

// 3.
instance.interceptors.response.use(res => res.data, err => {
    // 401状态码，进入该函数
    if (err.response && err.response.status === 401) {
        // 1清空无效用户名信息
        store.commit('user/setUser', {})
        //2.跳转到登录页

        // 当前路由地址
        // 组件里头：`/user?a=10`=>  $route.path === /user  $route.fullPath === /user?a=10
        // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
    return instance({
        url,
        method,
        // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
        // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
        // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
        // method参数：get,Get,GET  转换成小写再来判断
        // 在对象，['params']:submitData ===== params:submitData 这样理解
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}