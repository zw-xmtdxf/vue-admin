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
            <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

          <!-- v-show：在元素中添加 display，隐藏DOM元素 -->
        <el-form-item  prop="passwords" class="item-form" v-show="model ==='register'">
            <label for="">确认密码</label>
            <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
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
            <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button >
        </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
//引入./src/utils/validata里面的方法
import{ reactive,ref,onMounted } from '@vue/composition-api'
import{stripscript,validataemail,validatapassword,validatacode} from "@/utils/validata";
export default{
    name:"login",
    setup(prop,{refs}){
      //这里放置data数据，生命周期，自定义函数
      /**
       * 声明数据
       */
      const menuTab = reactive([
          {txt:'登录', current:true,type:"login"},
          {txt:'注册',current:false,type:"register"}
      ])
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
       * 函数
       */ 
        // 写函数的地方    
      const toggleMenu = (data =>{
        menuTab.forEach(element => {
            element.current = false;           
        });
        //高光
        data.current = true;   
        //修改model的值
        model.value = data.type;
        //在切换login和register时，将输入框的值清空
        ruleForm.username =null;    
        ruleForm.password =null;    
        ruleForm.code =null;
      })
      
        const submitForm = (formName =>{
            refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
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
      }
    },
    created(){},
    mounted(){},      
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