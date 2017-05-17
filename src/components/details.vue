<template>
<div class="details">
    <i class="load" v-if="animate"></i>
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
     <mu-list>
        <div class="details_view">
            <header class="title">{{story.title}}</header>
            <dl class="author clearfix">
                <dt><img :src="author.avatar" /></dt>
                <dd class="name">{{author.name}}</dd>
                <dd class="time">{{story.time}}</dd>
                <dd class="public" v-if="story.view_status === 1">公开</dd>
                <dd class="public" v-if="story.view_status === 0">保密</dd>
            </dl>
            <article></article>
            <section class="clearfix">
                <address>
                    <svg class="icon address" aria-hidden="true">
                        <use xlink:href="#icon-ditu"></use>
                    </svg>
                    <b>{{story.location}}</b>
                </address>
                <ul class="clearfix" ref="tips">
                    <li v-for="(tag, index) in tags">{{tag.name.substr(0, 4)}}</li>
                </ul>
                <ol class="clearfix">
                    <svg class="icon first" aria-hidden="true">
                        <use xlink:href="#icon-dianzan"></use>
                    </svg>
                    <li class="likeavatar" v-for="(like, index) in liked" v-if="index < 5"><img :src="like.avatar" /></li>
                    <li class="count">{{story.liked}}</li>
                </ol>
            </section>
            <main>
                <dl>
                    <dt class="clearfix">
                        <h4 class="left">
                            <u></u> 评论 <span>({{comments.total_records}})</span>
                        </h4>
                        <svg class="icon pinlun right" aria-hidden="true" v-if="false">
                            <use xlink:href="#icon-icon6"></use>
                        </svg>
                    </dt>
                    <dd v-for="data in comdata">
                        <div class="clearfix warp">
                            <div class="photo">
                                <img :src="data.avatar" />
                            </div>
                            <div class="middle">
                                <div class="user">{{data.name}}</div>
                                <div class="txt">{{data.content}}</div>
                            </div>
                            <div class="day">{{data.time}}</div>
                        </div>
                    </dd>
                </dl>
            </main>
        </div>
     </mu-list>
    <mu-infinite-scroll v-if="loadState" :scroller="scroller" :loading="loading" :loadingText="loadingText" @load="loadMore"/>
</div>
</template>

<script>
import { appIn, GetQueryString } from '../../static/js/app.js'
import axios from 'axios'
// import BScroll from 'better-scroll'
import '../../static/js/iconfont.js'
    export default {
        data() {
            return {
                posts: [],
                isLoading: false,
                fetchError: null,
                animate: true,
                loading: false, // 是否正在加载数据
                scroller: null, // 滚动的元素，会监听它的 scroll 事件
                refreshing: false, // 是否正在刷新数据
                trigger: null, // 触发下拉刷新的元素, 会给它绑定上事件
                loadingText: '正在加载...', // 加载数据时显示的文字
                loadState: true, // 是否要再加载
                num: 1, // 页码
                size: 10, // 每页记录数
                total_pages: 1, // 总页数
                story: {},
                author: {},
                liked: {},
                tags: {},
                comments: {},
                comdata: []
            }
        },
        watch: {
            '$route': function () {
                var self = this
                self.isLoading = true
                self.fetchData().then(function () {
                    self.isLoading = false
                })
            }
        },
        mounted() {
            this.scroller = this.$el
            this.trigger = this.$el
        },
        created() {
            let self = this
            let storyId = GetQueryString('story_id') || 1
            const uri = self.$store.state.uri + 'story/' + storyId
            axios.get(uri, {
                params: {
                    page: 1, // 页码
                    page_size: 10 // 每页记录数
                }
            }).then(function (response) {
                self.story = response.data.story
                self.author = response.data.story.author
                appIn('article', self.story.content)
                self.liked = response.data.liked
                self.tags = response.data.story.tags
                self.comments = response.data.comments
                self.comdata = response.data.comments.data
                self.total_pages = response.data.comments.total_pages
                self.animate = false
			}).catch(function (error) {
                console.log(error)
            })
            this.$nextTick(() => {
                // appIn('article', this.datapic)
                // self.animate = false
                /*
                const Interval = setInterval(() => {
                    setTimeout(() => {
                            clearInterval(Interval)
                            self.initScroll()
                        }, 100)
                }, 10)
                */
            })
        },
        methods: {
            /*
            initScroll() {
                if (!this.resultScroll) {
                    this.resultScroll = new BScroll(this.$el.foodWrapper, {
                        click: true,
                        probeType: 3
                    })
                } else {
                    this.resultScroll.refresh()
                }
            },
            */
            loadMore () {
            if (this.num < this.total_pages) {
                let self = this
                let storyId = GetQueryString('story_id') || 1
                const uri = self.$store.state.uri + 'story/' + storyId
                self.loading = true
                self.num ++
                setTimeout(function() {
                    axios.get(uri, {
                        params: {
                            page: self.num, // 页码
                            page_size: self.size // 每页记录数
                        }
                    }).then(function (response) {
                        var total = response.data.comments.total_records
                        self.loading = false
                        if (self.num >= total) {
                            self.loadState = false
                        } else {
                            // self.comdata.push(response.data.comments.data)
                            self.comdata = self.comdata.concat(response.data.comments.data)
                            // console.log(self.comdata)
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })
                    self.loading = false
                }, 1000)
                /*
                    setTimeout(() => {
                    }, 2000)
                */
            }
            },
            refresh () {
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                    window.location.reload()
                }, 2000)
            },
            fetchData: function () {
                var self = this
                return axios.get('/api/posts')
                .then(function (response) {
                    self.posts = response.data.posts
                })
                .catch(function (error) {
                    self.fetchError = error
                })
            }
        }
    }
</script>

<style lang="scss">
@import './details.scss';
@import './loading.scss';
</style>