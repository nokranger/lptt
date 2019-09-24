import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: 'AIzaSyBbrezyP1koQk0XFqL0KvbzJlauv9-FmJc',
  authDomain: 'lptt-28ae9.firebaseapp.com',
  databaseURL: 'https://lptt-28ae9.firebaseio.com',
  projectId: 'lptt-28ae9',
  storageBucket: '',
  messagingSenderId: '836518234496',
  appId: '1:836518234496:web:50715aa87ed2951aa29965'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
