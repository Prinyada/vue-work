import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// Axios
import VueAxios from 'vue-axios'
import axios from 'axios'

// Sweetalert2
import VueSweetalert2 from 'vue-sweetalert2'

import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

Vue.use(VueAxios, axios)

Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
