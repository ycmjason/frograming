import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/levels/0',
      name: 'level0',
      component: () => import(/* webpackChunkName: "level0" */'./views/Level0.vue'),
    },
    {
      path: '/levels/1',
      name: 'level1',
      component: () => import(/* webpackChunkName: "level1" */'./views/Level1.vue'),
    },
    {
      path: '/levels/2',
      name: 'level2',
      component: () => import(/* webpackChunkName: "level2" */'./views/Level2.vue'),
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});
