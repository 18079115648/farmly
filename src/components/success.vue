<template>
    <section class="clearfix">
        <div>
            <img :src="src" />
        </div>
        <p>已成功加入{{name}}</p>
        <button @click="getApp">下载同城家谱，协同宗亲修谱</button>
    </section>
</template>

<script>
// import { getModileType } from '../../static/js/app.js'
    export default {
        data() {
            return {
                src: this.$store.state.cover,
                name: this.$store.state.name
            }
        },
        methods: {
            getApp() {
                this.$router.push('/download')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @mixin fontJoin($size: .26rem, $family: PingFangSC-Regular, $color: #222, $line: 1.36rem) {
        font: $size $family;
        color: $color;
        line-height: $line;
    }

    section {
        width: 100%;
        height: 100%;
        min-width: 100vw;
        min-height: 100vh;
        background: #faf6ec;
        div {
            width: 5.8rem;
            height: 8.04rem;
            margin: .6rem auto 0rem;
            border: .16rem solid #fff;
            box-shadow: 0rem 0rem .6rem .01rem rgba(0, 0, 0, .36);// X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色 投影方式（inset/outset）
            img {
                width: 100%;
                height: 100%;
            }
        }
        p {
            @include fontJoin;
            text-align: center;
        }
        button {
            width: 80%;
            height: .88rem;
            display: block;
            color: #fff;
            font-size: .3rem;
            font-weight: 800;
            font-family: PingFangSC-Regular;
            line-height: .88rem;
            background-color: #b68957;
            border: none;
            outline: none;
            border-radius: .05rem;
            margin: 0rem auto;
            padding: 0rem;
        }
        button:hover {
            background-color: #7DAE3C;
        }
    }
</style>