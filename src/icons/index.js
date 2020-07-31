import Vue from "vue";
import SvgIcon from '../icons/SvgIcon';
//自定义全局组件  svg可缩放矢量图形 
Vue.component('svg-icon',SvgIcon);

/**
 * 
require.context读取指定目录的所有文件
(‘./svg’, false, /\.svg$/) 参数说明：
第一个：目录
第二个：是否遍历子级目录
第三个：定义遍历文件规则

 */
//读取目录的所有文件
const req = require.context('./svg', false, /\.svg$/) //$在正则里面表示结尾
const requireAll = requireContext => {
    console.log(requireContext.keys())
  return requireContext.keys().map(requireContext)
}
requireAll(req)
