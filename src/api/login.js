import service from "@/utils/request.js"
/**
 * 获取验证码接口
 */
export function GetSms(data){
    return service.request({
        method:"post",
        url:'/getSms/',
        data//data:data  左边的data（key）是后台接收的，右边的是data是接收的参数,如果两者同名可以写成一个即可
      })
}

/**
 * 获取用户角色接口
 */

/**
 * 获取登录接口
 */

/**
 * 获取注册接口
 */

export function Register(data){
  return service.request({
    method:"post",
    url:'/register/',
    data
  })
}