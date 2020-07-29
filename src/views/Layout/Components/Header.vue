// 每个.vue文件都有三块东西，template/模板，script/JS，style/样式，模板外层一定要有根元素包着
<template>
    <div id="header-wrap">
        头部
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss"scoped>
@import "../../../styles/main.scss";
    #header-wrap{ 
        position: fixed;
        top: 0;
        left: $navMenu;
        right: 0;
        background-color: #fff;
        height: 75px;
        z-index: 999;
        //-webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
        //分别对应X轴 Y轴 X扩展  Y扩展 rgba可以添加透明度
        -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
        
    }
</style>