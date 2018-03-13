const home = r => require.ensure([], () => r(require('../components/home.vue')), 'home')
const details = r => require.ensure([], () => r(require('../components/details.vue')), 'details')
const join = r => require.ensure([], () => r(require('../components/join.vue')), 'join')
const oauthJoin = r => require.ensure([], () => r(require('../components/oauthJoin.vue')), 'oauthJoin')
const skipPage = r => require.ensure([], () => r(require('../components/skipPage.vue')), 'skipPage')
const testOauthJoin = r => require.ensure([], () => r(require('../components/testOauthJoin.vue')), 'testOauthJoin')
const testSkipPage = r => require.ensure([], () => r(require('../components/testSkipPage.vue')), 'testSkipPage')
const success = r => require.ensure([], () => r(require('../components/success.vue')), 'success')
const content = r => require.ensure([], () => r(require('../components/content.vue')), 'content')
const download = r => require.ensure([], () => r(require('../components/download.vue')), 'download')
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
    path: '/oauthJoin',
    component: oauthJoin
}, {
    path: '/skipPage',
    component: skipPage
}, {
    path: '/testOauthJoin',
    component: testOauthJoin
}, {
    path: '/testSkipPage',
    component: testSkipPage
}, {
    path: '/success',
    component: success
}, {
    path: '/content',
    component: content
}, {
    path: '/download',
    component: download
}]