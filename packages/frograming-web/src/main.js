import Vue from 'vue';

import App from './App.vue';
import router from './router';

import { FadeTransition, SlideYDownTransition } from 'vue2-transitions';

Vue.config.productionTip = false;

Vue.component('FadeTransition', FadeTransition);
Vue.component('SlideYDownTransition', SlideYDownTransition);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
