import axios from 'axios'

//创建axios 对象
const service = axios.create({
    baseURL: '',//请求的根路径
    timeout: 10000//请求的超时时间

})
// 请求拦截器 在每次往后台发送请求时 以下函数会被调用
// axios.interceptors.request.use(function (config) {
//     return config
// },
//     function (error) {
//         return Promise.reject(error)
//     }
// )
//响应拦截器 当后台访问特定的状态，前端做出相应的操作
//列如 当用户停留同一个界面已经超过 cookie最大有效时间时 向后台发送请求 后台会报错 然后此时前端应该拦截该请求 可以跳转至登录界面  

/* axios.interceptors.response.use(function (config) {
    return config
},
    function (error) {
        return Promise.reject(error)
    }
) */
export default service