// 每个.vue文件都有三块东西，template/模板，script/JS，style/样式，模板外层一定要有根元素包着
<template>
    <div id="layout">
        <LayoutHeader />
        <LayoutMain />
        <LayoutNav />
    </div>
</template>
<script>
//引用的时候例如LayoutHeader、LayoutMain等可以自定义
import LayoutHeader  from '../Layout/Components/Header.vue' 
import LayoutMain  from '../Layout/Components/Main.vue' 
import LayoutNav  from '../Layout/Components/Nav.vue' 
export default {
    name:'Layout',
    //组件
    components:{LayoutHeader,LayoutMain,LayoutNav},

    setup(){

    }
}
</script>
<style lang="scss"scoped>
    #layout{
        background-color: #f7f7f7;
    }
</style>