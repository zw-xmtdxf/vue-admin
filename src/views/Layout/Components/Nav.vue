// 每个.vue文件都有三块东西，template/模板，script/JS，style/样式，模板外层一定要有根元素包着
<template>
    <div id="nav-wrap">
        菜单
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss"scoped>
@import "../../../styles/main.scss";
    #nav-wrap{
        //fixed（固定定位）：生成绝对定位的元素，相对于浏览器窗口进行定位。
        //元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。可通过z-index进行层次分级。
        position: fixed;
        width: $navMenu;
        top: 0;
        left: 0;
        height: 100vh;
        background-color: #344a5f;

    }
</style>