import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    uri: '/gene-api/',
    genealogy_id: '',
    inviter_id: '',
    cover: '',
    name: '',
    qqAppId: '101410208',
    qqAppSecret: '70bc407d8efbf4feb338cec2afc8e243',
    wxAppId: 'wxa44aee61d206be4a',
    wxAppSecret: '82247ce969bf0b7f3e12a636fe87434f',
    access_token: '',
    openId: '',
    unionId: undefined
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})