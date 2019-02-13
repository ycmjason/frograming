import Vue from 'vue';

import App from './App.vue';
import router from './router';

import VueAnalytics from 'vue-analytics';

import { FadeTransition, SlideYDownTransition } from 'vue2-transitions';

Vue.config.productionTip = false;

Vue.use(VueAnalytics, { id: 'UA-113352609-6', router });

Vue.component('FadeTransition', FadeTransition);
Vue.component('SlideYDownTransition', SlideYDownTransition);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
