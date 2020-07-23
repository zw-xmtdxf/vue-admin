// 每个.vue文件都有三块东西，template/模板，script/JS，style/样式，模板外层一定要有根元素包着
<template>
    <div id="login">这里登陆页面
       <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
    </div>
</template>
<script></script>
<style lang="scss" scoped>
#login{
    background-color: #344a5f;
    height: 100vh;

}
</style>