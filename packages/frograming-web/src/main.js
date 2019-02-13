import Vue from 'vue';
// import { sync } from 'vuex-router-sync';

import App from './App.vue';
import router from './router';
// import store from './store';

import { FadeTransition, SlideYDownTransition } from 'vue2-transitions';

// sync(router, store);

Vue.config.productionTip = false;

Vue.component('FadeTransition', FadeTransition);
Vue.component('SlideYDownTransition', SlideYDownTransition);

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app');
