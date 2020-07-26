import axios from 'axios'

//创建axios,赋给变量service(创建自己的拦截器)
//手把手撸码前端地址api:http://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service = axios.create(
  {
    baseURL: BASEURL,   //http://192.168.0.9:8080/devapi  ==== http://www.web-jshtml.cn/productapi
    timeout: 1000,
  }
);


// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });



  export default service;
















