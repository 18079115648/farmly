<template>
    <article class="article" ref="article">
    </article>
</template>

<script>
import axios from 'axios'
import { GetQueryString, appIn } from '../../static/js/app.js'
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
                appIn('article', self.content)
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        mounted() {
            /*
            if (getModileType() === 1) {
                this.$refs.article.style.fontSize = 12 + 'px'
                this.$refs.article.style.lineHeight = 15 + 'px'
            }
            */
        },
        methods: {},
        computed: {
        }
    }
</script>

<style lang="scss" scoped>

    .article {
        width: 100%;
        height: auto;
        min-width: 100vw;
        min-height: 100vh;
        background: #faf6ec;
        padding: 30px 15px 0px;
        font-family: PingFangSC-Regular;
        font-size: 48px;
        line-height: 72px;
        color: #333
    }

    @media only screen and (-webkit-device-pixel-ratio:.75) {
        /*低分辨率小尺寸的图片样式*/
        .article {
            font-size: 20px;
            line-height: 32px
        }
    }

    @media only screen and (-webkit-device-pixel-ratio:1) {
        /*普通分辨率普通尺寸的图片样式*/
        .article {
            font-size: 30px;
            line-height: 48px
        }
    }

    @media only screen and (-webkit-device-pixel-ratio:1.5) {
        /*高分辨率大尺寸的图片样式*/
        .article {
            font-size: 48px;
            line-height: 72px
        }
    }

    @media screen and (min-width:321px) and (max-width:375px) {
        .article {
            font-size: 16px;
             line-height: 20px
        }
    }

    @media screen and (min-width:376px) and (max-width:414px) {
        .article {
            font-size: 20px;
             line-height: 32px;
        }
    }

    @media screen and (min-width:415px) and (max-width:639px) {
        .article {
            font-size: 24px;
             line-height: 38px
        }
    }

    @media screen and (min-width:640px) and (max-width:719px) {
        .article {
            font-size: 28px;
             line-height: 42px;
        }
    }

    @media screen and (min-width:720px) and (max-width:749px) {
        .article {
            font-size: 30px;
             line-height: 48px
        }
    }

    @media screen and (min-width:750px) and (max-width:799px) {
        .article {
            font-size: 32px;
             line-height: 50px
        }
    }

    @media screen and (min-width:800px) {
        .article {
            font-size: 36px;
             line-height: 58px
        }
    }

    @media screen and (min-width:1000px) {
        .article {
            font-size: 48px;
             line-height: 72px
        }
    }
</style>