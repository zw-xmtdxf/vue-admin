// 每个.vue文件都有三块东西，template/模板，script/JS，style/样式，模板外层一定要有根元素包着
<template>
    <div id="main-wrap">
        <router-view />
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss"scoped>
@import "../../../styles/main.scss";
    #main-wrap{
        position: fixed;
        left: $navMenu;
        top: 75px;
        right: 0;
        height: 100%;
        border: solid 30px #f7f7f7 ;
        border-bottom: none;
    }
</style>