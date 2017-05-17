const home = r => require.ensure([], () => r(require('../components/home.vue')), 'home')
const details = r => require.ensure([], () => r(require('../components/details.vue')), 'details')
const join = r => require.ensure([], () => r(require('../components/join.vue')), 'join')
const success = r => require.ensure([], () => r(require('../components/success.vue')), 'success')
const content = r => require.ensure([], () => r(require('../components/content.vue')), 'content')
export default [{
    path: '/',
    component: home
}, {
    path: '',
    redirect: '/home'
}, {
    path: '/home',
    component: home
}, {
    path: '/details',
    component: details
}, {
    path: '/join',
    component: join
}, {
    path: '/success',
    component: success
}, {
    path: '/content',
    component: content
}]