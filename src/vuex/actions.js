export default {
    addID({ commit, state }, data) {
        commit('addId', data)
    },
    addGenealogy({ commit, state }, { cover, name }) {
        commit('addgenealogy', { cover, name })
    }
}

//  this.$store.dispatch('add', this.tabsUri)