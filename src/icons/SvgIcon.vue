<template>
        <svg :class="svgClass" aria-hidden="true">
                <use :xlink:href="iconName"></use>
         </svg> 
</template>
<script>
import{computed,ref,onMounted } from '@vue/composition-api';
export default {
    name:'svgIcon',
    // props:['iconClass','className'],
    props:{
        iconClass:{
            type:String,
            default:'',
            },
        className:{
            type:String,
            default:'',
        },
    },
    setup(props){
        /**
         * computed 监听属性变化并计算属性
         * 例如可以用来计算金钱总额
         */
        // const plusOne = computed( {
        //     get : () =>number.value + 1,
        //     set : value =>{number.value = value -1}
        // })


        //计算属性，得出最终结果，并返回
        const iconName = computed(()=>`#icon-${props.iconClass}`)

        const svgClass = computed(()=>{
            if(props.className){
                return `svg-icon ${props.className}`
            }else{
                return `svg-icon`
            }
        })
        return{
            iconName,
            svgClass,
        }
    },

}
</script>
<style lang="scss" scoped>
.svg-icon{
    width: 1em;
    height: 1em;
    fill: currentColor;
    // color: red;
    &font12{
        font-size: 12px;
    }
}
</style>







