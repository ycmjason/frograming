import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';
import Level from './views/Level.vue';

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
      path: '/l/:level',
      name: 'level',
      component: Level,
      props: ({ params, query }) => ({ level: Number(params.level), c: query.c }),
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
  scrollBehavior () {
    return { x: 0, y: 0 };
  },
});
