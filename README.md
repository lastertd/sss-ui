# sss-ui

**目前仍处于开发阶段👻**



## setup

~~~
npm i sss-ui
~~~



## use

~~~js
import Vue from 'vue'

import sssui from "sss-ui"
Vue.use(sssui);


import App from './App.vue'
new Vue({
  render: h => h(App),
}).$mount('#app')
~~~

或者按需引入

~~~js
import Vue from 'vue'

import {button,toolTip} from "sss-ui"
Vue.component(button.name, button);
Vue.component(toolTip.name, toolTip);

Vue.config.productionTip = false

import App from './App.vue'
new Vue({
  render: h => h(App),
}).$mount('#app')
~~~



**请保证sssui在App之前引入**



