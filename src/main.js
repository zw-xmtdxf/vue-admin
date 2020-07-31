import Vue from "vue";
import VueCompositionApi from '@vue/composition-api'; Vue.use(VueCompositionApi);
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import "./icons"

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCompositionApi);


//运行模式runtime
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
