import axios from 'axios';
import {message} from 'antd'
import qs from 'qs'
// 1. axios的默认配置
axios.defaults.baseURL = "http://localhost:8888"
axios.defaults.headers["Content-Type"]= "application/x-www-form-urlencoded";


// 2. 拦截器配置
axios.interceptors.request.use((config)=>{
  if(config.method === "post"){
    config.data = qs.stringify(config.data,{ arrayFormat: 'repeat' })
  }
  return config;
})
axios.interceptors.response.use((response)=>{
  let {data} = response;
  response.status = data.status;
  response.statusText = data.message;
  response.data = data.data;

  //判断状态码，如果是200，表示成功，如果不是200，返回信息
if(data.status!==200){
  message.error(data.message)
  return Promise.reject(response);
}


  return response;
},(error)=>{
  message.error("服务端异常")
  return Promise.reject(error);
})

export default axios;