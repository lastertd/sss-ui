import Vue from 'vue'


import sssUi from "../src";
Vue.use(sssUi,{zindex:3000});



Vue.config.productionTip = false

import App from './App.vue'
new Vue({
  render: h => h(App),
}).$mount('#app')
