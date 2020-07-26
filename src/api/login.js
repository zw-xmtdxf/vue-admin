import service from "@/utils/request.js"
/**
 * 获取验证码接口
 */
export function GetSms(){
    service.request({
        method:"post",
        url:'/getSms/',
        data:{}
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