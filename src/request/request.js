import axios from "axios"

// axios.defaults.baseURL = "http://120.79.214.0/api"

axios.defaults.baseURL = "http://localhost:3366"

function request(method, path, payload){
  if(method == 'GET'){
    return axios.get(path, payload)
  }
  if(method == 'POST'){
    return axios.post(path, JSON.stringify(payload))
  }
}

export { request }