// 每个.vue文件都有三块东西，template/模板，script/JS，style/样式，模板外层一定要有根元素包着
<template>
    <div id="login">
        <div class="height">
            <div class="login-wrap">
            <ul class="login-menu" >
                <li :class="{'current':item.current}"  v-for="item in logintext" :key="item.id" @click="logincurrent(item)">{{item.text}}</li>
            </ul>
            <!-- 表单开始 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm" size="medium">

                <el-form-item  prop="username" class="input-lable">
                    <label for="" class="label-text">邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off" ></el-input>
                </el-form-item>

                <el-form-item  prop="password" class="input-lable">
                    <label for="" class="label-text">密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocompl ete="off" minlength="6" maxlength='20'></el-input>
                </el-form-item>

                <el-form-item  prop="code" class="input-lable">
                    <label for="" class="label-text">验证码</label>
                    <el-row :gutter="20">
                    <el-col :span="15"><el-input v-model.number="ruleForm.code" minlength="6" maxlength='6'></el-input></el-col>
                    <el-col :span="9"><el-button type="success" class="code-button">获取验证码</el-button></el-col>
                    </el-row>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-button">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        </div>        
    </div>
</template>
<script>
export default{
    name:"login",
    data (){
        //验证码
        var validateCode = (rule, value, callback) => {
            let reg = /^[a-z0-9]{6}$/
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else{
            if(!reg.test(value)){
                return callback(new Error('验证码错误'));
            }
        }
      };
      //邮箱
      var validateUsername = (rule, value, callback) => {
          let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          if (!reg.test(value)) {
            callback(new Error('邮箱格式错误'));
          }
          callback();
        }
      };
      //密码
      var validatePassword = (rule, value, callback) => {
          let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('密码格式错误'));
        } else {
          callback();
        }
      };
      
        return{
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
        },
            logintext:[
                {text:"登录",current:true},
                {text:"注册",current:false}
            ],
        }
    },
    mountend(){},
    methods:{
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
        logincurrent(data){
            console.log(data)
            this.logintext.forEach(element => {
                element.current = false;
            });
            data.current = true;

            
        }
    }
}
</script>
<style lang="scss" scoped>
.height{
    position: absolute;
    top: 15%;
    left: 35%;
}
#login{
    position: relative;
    background-color: #344a5f;
    height: 100vh;
}
.login-wrap{
    width: 329px;
    // background-color: yellow;
    // margin: auto;
}
.login-menu{
    text-align: center;
    color: #FFF;
    margin-bottom: 28px;
    li{
        display: inline-block;
        line-height: 36px;
        width:88px;
        border-radius: 2px;
        cursor: pointer;
    }
    
}
.current{
    background-color: #2f4255;
}
.label-text{
        display: block;
        color: #fff;
        font-size: 14px;
        margin-bottom: 3px;
    }
.input-lable{
    margin-bottom: 13px;
}
.login-button{
    display: block;
    width: 100%;
    margin-top: 19px;
}
.code-button{
    width: 100%;
}
</style>