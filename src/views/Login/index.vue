// 每个.vue文件都有三块东西，template/模板，script/JS，style/样式，模板外层一定要有根元素包着
<template>
<!-- 内容区 -->
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
            <!-- 表单开始 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">

        <el-form-item prop="username" class="item-form">
            <label for="username">邮箱</label>
            <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  prop="password" class="item-form">
            <label for="password">密码</label>
            <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

          <!-- v-show：在元素中添加 display，隐藏DOM元素 -->
        <el-form-item  prop="passwords" class="item-form" v-show="model ==='register'">
            <label for="passwords">确认密码</label>
            <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item  prop="code" class="item-form">
            <label for="code">验证码</label>
            <el-row :gutter="11">
              <!-- v-model.number="ruleForm.code" 会导致当开头输入数字时只能输入数字 -->
            <el-col :span="15"><el-input id="code" v-model="ruleForm.code" minlength="6" maxlength="6" ></el-input></el-col>
            <el-col :span="9">
                <el-button type="success"  class="block" @click="getSms()" v-bind:disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button>
            </el-col>
            </el-row>           
        </el-form-item>

        <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" v-bind:disabled="loginButtonStatus">{{model ==='login'? '登录':'注册'}}</el-button >
        </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>

//引入./src/utils/validata里面的方法

//JS实现的base64加密、md5加密及sha1加密
import sha1 from "js-sha1";
import {GetSms,Register,Login} from '@/api/login.js';
import axios from 'axios';
import{ reactive,ref,isRef,toRefs,onMounted } from '@vue/composition-api';
import{stripscript,validataemail,validatapassword,validatacode} from "@/utils/validata";
export default{
    name:"login",
    // setup(prop,context){}
    
      //这里放置data数据，生命周期，自定义函数
/**
 * attrs: (...)==this.$attrs
    emit: (...)==this.$emit
    isServer: (...)==this.$isServer
    listeners: (...)==this.$listeners
    parent: (...)==this.$parent
    refs: (...)==this.$refs  获取Dom元素
    root: (...)==this
 */

setup(prop,{ refs,root }){
      /**
       * 声明数据
       */
      const menuTab = reactive([
          {txt:'登录', current:true,type:"login"},
          {txt:'注册',current:false,type:"register"}
      ])

    //登录按钮禁用状态
    const loginButtonStatus = ref(true);

    //更新按钮的状态
    const updataButtonStatus = ((params)=>{
        codeButtonStatus.status = params.status;
        codeButtonStatus.text = params.text
    })



    //获取验证码
    const codeButtonStatus = reactive(
      {
        status:false,
        text:'获取验证码'
      }
   )

    //用于保存倒计时
      const timer = ref(null);
      const model = ref('login');
      
      //获取值方式：number.value
      // console.log(model.value)

      //表单绑定数据
      const ruleForm = reactive({
          username: '',
          password: '',
          passwords: '',
          code: ''
        })


        //验证用户名为邮箱
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validataemail(value)){
            callback(new Error('用户名格式有误'));
        }
        else {
          callback();//返回true
        }
      }
      //验证密码
      let validatePassword = (rule, value, callback) => {
        //过滤后的数据
        ruleForm.password  = stripscript(value);
        value = ruleForm.password;
          
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (validatapassword(value)) {
          callback(new Error('密码为6-20位的数字+字母'));
        } else {
          callback();
        }
      }
      //验证重复密码
      let validatePasswords = (rule, value, callback) => {
        //如果模块值为login时，不用验证密码的重复，直接通过
        if(model.value === 'login'){
          callback();
        }
        //过滤后的数据
        ruleForm.passwords  = stripscript(value);
        value = ruleForm.passwords;
          
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value !=ruleForm.password) {
          callback(new Error('密码不一致，请重新输入'));
        } else {
          callback();
        }
      }
      //验证码
      let validateCode = (rule, value, callback) => {
        ruleForm.code  = stripscript(value);
        value = ruleForm.code;
        if (value === '') {
          return callback(new Error('请输入验证码'));
        }else if(validatacode(value)){
            return callback(new Error('验证码格式错误'));
        }else{
            callback();
        }
      }
      /**
       * 函数 // 声明函数的地方  
       */ 
          

        //切换模块
      const toggleMenu = (data =>{
        menuTab.forEach(element => {
            element.current = false;           
        });
        //高光
        data.current = true;   
        //修改model的值
        model.value = data.type;
        resetFormData();
        clearCountDown();
        loginButtonStatus.value = true;
      })

      //清除表单数据
    const resetFormData = (()=>{
      //在切换login和register时，重置表单
        refs.ruleForm.resetFields();
    })

      //获取验证码
      const getSms = (()=>{
        //对错误进行提示
        if(ruleForm.username ==''){
          root.$message.error('邮箱不能为空!!');
          return false;
        }
        if(validataemail(ruleForm.username)){
          root.$message.error('邮箱格式错误!!！');
          return false;
        }
        //定义参数
        let requestData = {
          username:ruleForm.username,
          module:model.value
        }
        // codeButtonStatus.value = true;
        // codeButtonText.value = '发送中'
        updataButtonStatus({
          status:true,
          text:'发送中'
        });
        setTimeout(()=>{
          //调用login.js里面的GetSms方法,获取验证码
        GetSms(requestData).then(response => {
          let data = response.data;
          root.$message({
          message: data.message,
          type: 'success'
        })
        //发送成功后启用登录或注册按钮
        loginButtonStatus.value = false;
        //调用定时器开启倒计时
          countDown(60);
        }).catch(error =>{
          console.log(error)
        })
        },3000)

        
      })
      
      //提交表单
        const submitForm = (formName =>{
          console.log(model.value)
            refs[formName].validate((valid) => {
              //表单验证通过
          if (valid) {
            //判断进入登录接口还是注册接口
            model.value == 'login'? login():register();
            } else {
            console.log('error submit!!');
            return false;
          }
        })
      })

      /**
       * 登录
       */
      const login = (()=>{
        let requestData = {
          username: ruleForm.username,
          password: sha1(ruleForm.password),
          code: ruleForm.code,
        }
          Login(requestData).then(response=>{
            console.log('登录结果')
            console.log(response)
            //页面跳转
            root.$router.push({
              name:'Console'
            })
            
          }).catch(error=>{

          })
      })
      
      /**
       * 注册接口操作
       */
      const register = (()=>{
        let requestData = {
              username: ruleForm.username,
              password: sha1(ruleForm.password),
              code: ruleForm.code,
              module:'register'
            }
            //注册
            Register(requestData).then(response=>{
              let data = response.data;
              root.$message({
              message: data.message,
              type: 'success'
                          })
              //注册成功
              toggleMenu(menuTab[0])
              //清除倒计时
              clearCountDown();

              //失败时执行代码
            }).catch(error=>{
            })
      })


      //倒计时
      const countDown =((number)=>{
        //清除定时器
        if(timer.value){clearInterval(timer.value);}
          //setTumeout 只执行一次
          //setInterval 不断执行，需要条件才会停止

          let time = number;

          timer.value = setInterval(() =>{
            time--;
            if(time === 0){
              clearInterval(timer.value); 
              updataButtonStatus({
                    status:false,
                    text:'再次获取'
                  });         
            }else{
               codeButtonStatus.text = `倒计时${time}秒`
            }
            
          },1000)
      })

      /**
       * 清除倒计时
       * 
       */
      const clearCountDown = (()=>{
        //还原验证码默认状态
        updataButtonStatus({
          status:false,
          text:'获取验证码'
        }); 
        //清除倒计时
        clearInterval(timer.value);


      //   const codeButtonStatus = reactive(
      // {
      //   status:false,
      //   text:'获取验证码'
      // })
      })

      
      
        //表单验证
        const rules = reactive({
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          passwords: [
            { validator: validatePasswords, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
        }) 
      /**
       * 生命周期
       */
      onMounted(()=>{
      })
      return{
        menuTab,
        model,
        ruleForm,
        rules,
        toggleMenu,
        submitForm,
        getSms,
        loginButtonStatus,
        codeButtonStatus,
        countDown,
      }
    },
    created(){},
    mounted(){
    },      
    }
</script>
<style lang="scss" scoped>
#login{
    background-color: #344a5f;
    height: 100vh;

}
.login-wrap{
    width:329px;
    // background-color: red;
    margin : 0 auto;
}
.menu-tab{
    text-align: center;
    li{
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }
    .current{
        background-color:#2f4255;
    }
}
.login-form{
    margin-bottom: 29px;
    label{
        display: block;
        color: #fff;
        font-size: 14px;
        margin-bottom: 3px;
    }
    .item-form{
        margin-bottom: 13px;
    }
    .block{
        display: block;
        width: 100%;
    }
    .login-btn{
        margin-top: 19px;
    }
}
</style>

<!--
密码加密：
1、在前端预先加密
登录的密码：123456(普通字符串)
经过加密后的密码：sha1('123456') == '8465132safddfs45123ewg'（加密后的字符串）

2、后台加密：
接收到字符串：'8465132safddfs45123ewg'
后台再次加密：（md5加密） md5('8465132safddfs45123ewg') == '9846513saff9sa9dg645gag79846d5agaf9'
最终新的字符串写入数据库 9846513saff9sa9dg645gag79846d5agaf9
-->






















