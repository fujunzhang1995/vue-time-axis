import Vue from 'vue'
import App from './App.vue'
import vueTimeAxis from './lib/index'

Vue.use(vueTimeAxis)

new Vue({
    el: '#app',
    render: h => h(App)
})
