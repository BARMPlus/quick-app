import axios from 'axios'
import qs from 'qs'
// import {getLimited,setLimited,getLimitedUrl,setLimitedUrl,setToken} from './auth'
import { getToken, TokenKey } from './auth'

const baseURL = process.env.VUE_APP_BASE_API

let config = {
  loginUrl: '', // 登陆地址
  loginApi: `${baseURL}/wechatmini/login`, // 登陆API
  logoutApi: `${baseURL}/logout`, // 退出API
  indexUrl: '' // 首页
}
const service = axios.create({
  baseURL,
  timeout: 15000, // 请求超时时间
  withCredentials: true
})

service.interceptors.request.use(config => { // request拦截器
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    config.data = qs.stringify(config.data)
  }
  if (getToken()) {
    config.headers[TokenKey] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }

  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use( // respone拦截器
  response => {
    let request = response.request

    if (request.responseURL === config.loginApi && request.status === 200) { // 登陆成功

      /*  setToken(response.headers['x-auth-token']);
      if(getLimited()==='true'){
        setLimited('false');
        location.href=getLimitedUrl();
      }
      else{
        location.href=config.indexUrl;
      } */
    } else if (request.responseURL === config.logoutApi && request.status === 200) { // 注销
      location.href = config.loginUrl
    }
    return response.data
  },
  error => {
    if (!error.response) {
      // alert('网络异常');
      // 断网了
      return
    }
    switch (error.response.status) {
      case 401:
      /* if (location.href === config.loginUrl) {    //登陆页面401错误，提示用户名或者密码错误
       }
       else {    //访问受限资源，跳转至登陆页面
       setLimited('true');
       setLimitedUrl(location.href);
       } */
        break
      case 403: // 403权限不足，提示用户
        this.$vux.alert.show({
          title: '提示',
          content: '权限不足'
        })
        // 自行修改
        break
    }

    return Promise.reject(error)
  }
)
export default service
