// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import demoBlock from './components/demo-block'
// 动态全局注册组件
import './components/global'
import './views/global'
Vue.component('demo-block', demoBlock)
Vue.config.productionTip = false
Vue.prototype.$ = $
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
