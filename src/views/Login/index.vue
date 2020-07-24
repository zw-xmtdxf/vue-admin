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
            <label for="">邮箱</label>
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  prop="password" class="item-form">
            <label for="">密码</label>
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item  prop="code" class="item-form">
            <label for="">验证码</label>
            <el-row :gutter="11">
            <el-col :span="15"><el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input></el-col>
            <el-col :span="9">
                <el-button type="success"  class="block">获取验证码</el-button>
            </el-col>
            </el-row>
            
        </el-form-item>

        <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">登录</el-button >
        </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
export default{
    name:"login",
    data(){
      //验证用户名为邮箱
      var validateUsername = (rule, value, callback) => {
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(!reg.test(value)){
            callback(new Error('用户名格式有误'));
        }
        else {
          callback();//返回true
        }
      };
      //验证密码
      var validatePassword = (rule, value, callback) => {
          let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('密码为6-20位的数字+字母'));
        } else {
          callback();
        }
      };
      //验证码
      var validateCode = (rule, value, callback) => {
      let reg = /^[a-z0-9]{6}$/
        if (value === '') {
          return callback(new Error('请输入验证码'));
        }else if(!reg.test(value)){
            return callback(new Error('验证码格式错误'));
        }else{
            callback();
        }
      };
        return{
            menuTab:[
                {txt:'登录', current:true},
                {txt:'注册',current:false}
            ],
            ruleForm: {
          username: '',
          password: '',
          code: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
        }
        }
    },
    created(){},
    mounted(){},
    methods:{
        // 写函数的地方
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    toggleMenu(data){
        this.menuTab.forEach(element => {
            element.current = false;           
        });
        data.current = true;
    }
    }
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