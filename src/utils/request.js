import axios from 'axios'
import { Message } from 'element-ui';

//创建axios,赋给变量service(创建自己的拦截器)
//手把手撸码前端地址api:http://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service = axios.create(
  {
    baseURL: BASEURL,   //http://192.168.0.9:8080/devapi  ==== http://www.web-jshtml.cn/productapi
    timeout: 15000,
  }
);


// 添加请求拦截器(请求接口之前做一些数据处理)
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //添加Tokey
    //添加userId
    //sui
    //以及一些后台需要前端传的数据
  console.log(config.headers)
  //业务需求

  //最终的目的是在请求头添加参数
  config.headers.Tokey = '11111';
  config.headers.userId = '444444';
  config.headers.sui = '3333';
  



    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器(请求接口之后对返回的一些数据进行处理)
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
let data = response.data
if(data.resCode !== 0){
  Message.error(data.message);
  return Promise.reject(data);
}else{
  return response;
}

    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });



  export default service;
















