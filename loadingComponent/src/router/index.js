import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoadCom from '@/components/loadCom'  

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoadCom',
      component: LoadCom
    }
  ]
})
