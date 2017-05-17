// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router/router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './vuex/store'
// import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import FastClick from 'fastclick'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Validator from 'vue-validator'

Vue.prototype.$axios = axios
Vue.config.productionTip = true

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(MuseUI)
Vue.use(Validator)

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body)
    }, false)
}

const router = new VueRouter({
    routes,
    mode: 'history',
    strict: process.env.NODE_ENV !== 'production'
})

router.replace('/home')

/* eslint-disable no-new */
new Vue({
    store,
    router,
    components: { App },
    render: h => h(App)
}).$mount('#app')