import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { FadeTransition } from 'vue2-transitions';

Vue.config.productionTip = false;

Vue.component('FadeTransition', FadeTransition);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
