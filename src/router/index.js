import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import Login from "../views/Login/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden:true,
    meta :{
      name:'主页'
    }    
  },
  {
    path: "/Login",
    name: "Login",
    hidden:true,
    meta :{
      name:'登录',
    }, 
    component: () => import("../views/Login/index.vue"),
    
  },
  {
    path: "/Console",
    name: "Console",
    redirect: "index",
    meta :{
      name:'控制台',
    },   
    component: () => import("../views/Layout/index.vue"),
    children:[
      {
        path: "/index",
        name: "index",
        meta :{
          name:'首页',
        }, 
        component: () => import("../views/Console/index.vue"),
      },
    ]
  },

  {
    path: "/info",
    name: "info",
    meta :{
      name:'信息管理',
    },   
    component: () => import("../views/Layout/index.vue"),
    children:[
      {
        path: "/infoIndex",
        name: "infoIndex",
        meta :{
          name:'信息列表',
        }, 
        component: () => import("../views/info/index.vue"),
      },
      {
        path: "/infoCategory",
        name: "infoCategory",
        meta :{
          name:'信息分类',
        }, 
        component: () => import("../views/info/Category.vue"),
      },
    ]
  },
  {
    path: "/user",
    name: "User",
    redirect: "index",
    meta :{
      name:'用户管理',
    },   
    component: () => import("../views/Layout/index.vue"),
    children:[
      {
        path: "/userIndex",
        name: "userIndex",
        meta :{
          name:'用户列表',
        }, 
        component: () => import("../views/User/index.vue"),
      },
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;

// const originalPush = VueRouter.prototype.push
//    VueRouter.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }