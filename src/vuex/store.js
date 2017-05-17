import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    uri: '/gene-api/',
    genealogy_id: '',
    cover: '',
    name: ''
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})