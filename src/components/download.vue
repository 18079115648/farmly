<template>
    
</template>

<script>
import { getModileType } from '../../static/js/app.js'
export default {
    components: {
    },
    data() {
        return {
        }
    },
    props: {
    },
    created() {
        if (getModileType() === 1) {
            console.log('Android')
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.jhcm.tcjp'
        } else {
            console.log('IOS')
            window.location.href = 'https://itunes.apple.com/cn/app/%E5%90%8C%E5%9F%8E%E5%AE%B6%E8%B0%B1/id1041884281?l=en&mt=8'
        }
    },
    mounted() {
    },
    methods: {
    },
    computed: {
    }
}
</script>

<style lang="scss" scoped>

</style>