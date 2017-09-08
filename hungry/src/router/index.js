import Vue from 'vue';
import Router from 'vue-router';

import goods from '../components/goods/goods';
import appraise from '../components/appraise/appraise';
import merchant from '../components/merchant/merchant';

Vue.use(Router);
const routes = [{
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'goods',
    component: goods
  },
  {
    path: '/appraise',
    name: 'appraise',
    component: appraise
  },
  {
    path: '/merchant',
    name: 'merchant',
    component: merchant
  }
];
export default new Router({
  routes,
  linkActiveClass: 'active'
});
