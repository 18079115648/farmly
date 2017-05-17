<template>
    <article>
        {{content}}
    </article>
</template>

<script>
import axios from 'axios'
import { GetQueryString } from '../../static/js/app.js'
    export default {
        data() {
            return {
                content:''
            }
        },
        created() {
            var self = this
            var key = GetQueryString('key') || 'aboutus'
            axios.get(self.$store.state.uri + 'config/' + key)
            .then(function (response) {
                self.content = response.data.value
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        methods: {}
    }
</script>

<style lang="scss">
    article {
        width: 100%;
        height: 100%;
        min-width: 100vw;
        min-height: 100vh;
        background: #faf6ec;
        padding: .6rem .3rem 0rem;
        font-family: PingFangSC-Regular;
        font-size: .3rem;
        line-height: .48rem;
        color: #333;
    }
</style>