import axios from "axios"

// axios.defaults.baseURL = "http://120.79.214.0/api"

axios.defaults.baseURL = "http://localhost:3366"
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  //为请求头对象, 添加 token 验证的 Authorization 字段  
  config.headers['Authorization'] = window.sessionStorage.getItem('token')
  //*发起登录请求的时候还没有token, window.sessionStorage.getItem('token')为"null"   
  return config
})

function request(method, path, payload){
  if(method == 'GET'){
    return axios.get(path, payload)
  }
  if(method == 'POST'){
    return axios.post(path, JSON.stringify(payload))
  }
  // if(method == 'PUT'){ 
  //   return axios.put('/test', JSON.stringify({'name': 'chen'}))
  // }
}

export { request }