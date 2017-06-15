export default {
    addId(state, data) {
        state.genealogy_id = data
    },
    addInviter(state, data) {
        state.inviter_id = data
    },
    addgenealogy(state, { cover, name }) {
        state.cover = cover
        state.name = name
    }
}

// this.$store.commit('add', this.tabsUri)