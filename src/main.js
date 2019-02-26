// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引用路由
import Lazyload from 'vue-lazyload-img'
import VueRouter from 'vue-router'
import routes from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import store from './store'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(WeVue)
Vue.use(Lazyload, {
  fade: true
})
const router = new VueRouter({
	routes
});

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
