import Vue from 'vue'
import Router from 'vue-router'
// import demo from '../components/demo-block'
import routerJson from './moudel/router_json'
Vue.use(Router)
export default new Router({
  // routes: [{
  //   path: '/',
  //   // name: 'component'
  //   redirect: '/home'
  //   // component: r => require.ensure([], () => r(require('../docs/template.md')))
  //   // component: demo
  // },
  // {
  //   path: '/home',
  //   name: 'main',
  //   component: r => require.ensure([], () => r(require('../docs/template.md')))
  // }
  // ]
  routes: routerJson
})
