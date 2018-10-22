import Vue from 'vue'
import Router from 'vue-router'
// import demo from '../components/demo-block'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'component',
      component: r => require.ensure([], () => r(require('../docs/template.md')))
      // component: demo
    }
  ]
})
