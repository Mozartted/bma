import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'

Vue.config.productionTip = false


import './style/app.scss'

Vue.use(BootstrapVue)
// import { LayoutPlugin } from 'bootstrap-vue'
// Vue.use(LayoutPlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
