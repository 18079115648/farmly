<template>
	<div class="flipbook-viewport">
		<i class="load" v-if="animate"></i>
		<div class="previousPage"></div>
		<div class="nextPage"></div>
		<div class="return"></div>
		<div class="modal index">
			<dl>
				<dt>
					<p class="font1">家谱目录</p>
					<p class="font2">共{{index[9]}}页</p>
				</dt>
				<dd>
					<div class="index_warp"
					     @click="turn(1)">
						<P class="font1">封面</P>
						<P class="font2">01</P>
					</div>
				</dd>
				<dd v-for="title in titles">
					<div class="index_warp"
					     @click="turn(title.index)">
						<P class="font1">{{title.name}}</P>
						<P class="font2">{{title.index}}</P>
					</div>
				</dd>
			</dl>
			<div class="button" @click="hide()"></div>
		</div>
		<ul class="modal bar">
			<li class="icon1"> <!-- @click="show()" -->
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-mulu"></use>
				</svg>
			</li>
			<!--
				<li class="icon2">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-arrow121112"></use>
					</svg>
				</li>
			-->
		</ul>
		<section class="modal floor">
			<div class="icon" @click="href()"></div>
			<div class="font">
				<p class="p1">同城家谱</p>
				<p class="p2">给你一个家族</p>
			</div>
			<div class="button" @click="href()">申请加入</div>
		</section>
		<div class="container">
			<div class="flipbook">
				<section class="peel">
					<div></div>
					<strong><h3>{{bookData.name}}</h3></strong>
					<article>
						<p>{{bookData.founder_name}}</p>
						<p>{{bookData.create_time}}</p>
					</article>
				</section>
			</div>
		</div>
		<div class="bg">
			<div class="bg_main"></div>
			<ul>
				<li class="li1">&lt;</li>
				<li class="li2"></li>
				<li class="li3">&gt;</li>
			</ul>
		</div>
		<div class="vis">
			<div class="vis1">{{section1}}</div>
			<div class="vis2">{{section2}}</div>
			<div class="vis3">{{section3}}</div>
			<div class="vis4"></div>
			<div class="vis5">
				<div class="vis5_main" v-for="data in section5">
					<img :src="data.avatar" />
					<div class="vis5_cont">{{data.introduce}}</div>
				</div>
			</div>
			<div class="vis6"></div>
			<div class="vis7"></div>
			<div class="vis8">
				<div class="vis8_main">
					<img :src="section8Pic" />
					<div class="vis8_cont">{{section8.content}}</div>
				</div>
			</div>
			<div class="vis9"></div>
			<div class="vis10">{{section10}}</div>
		</div>
	</div>
</template>

<script>
import { load, loadApp, goto, zero, bg, getPhoneType, tragtouch, GetQueryString, pagetion, pagetionV, pagetionRE, pagetionIMG, pagetionLs, pagetionFR, pagetionPS } from '../../static/js/app.js'
import $ from 'jquery'
import axios from 'axios'
import '../../static/js/turn.min.js'
import '../../static/js/zoom.min.js'
import '../../static/js/iconfont3.js'
export default {
	data() {
		return {
			animate: true,
			load: true,
			titles: [{ name: '谱序', index: '02' }, { name: '姓氏起源', index: '' }, { name: '族规家训', index: '' }, { name: '辈分表', index: '' }, { name: '名人榜', index: '' }, { name: '功德榜', index: '' }, { name: '长寿榜', index: '' }, { name: '祠堂', index: '' }, { name: '老家谱', index: '' }, { name: '后记', index: '' }],
			index: [],
			bookData: {},
			section1:'',
			section2:'',
			section3:'',
			section4:'',
			section5:[],
			section6:[],
			section7:[],
			section8:{},
			section8Pic:'',
			section9:[],
			section10:{}
		}
	},
	created() {
		var _self = this
		var self = this
		load()
		// let genealogyId = GetQueryString('genealogy_id') || 1
		// self.$store.state.genealogy_id = GetQueryString('genealogy_id') || 1
		self.$store.dispatch('addID', GetQueryString('genealogy_id') || 1)
		localStorage.setItem('addID', GetQueryString('genealogy_id') || 1)
		localStorage.setItem('addInviteR', GetQueryString('inviter_id') || 1)
		self.$store.dispatch('addInviteR', GetQueryString('inviter_id') || 1)
		axios.get(_self.$store.state.uri + 'genealogy/view/' + self.$store.state.genealogy_id, {
                params: {
                   genealogy_id: self.$store.state.genealogy_id
                }
            })
			.then(function (response) {
				var data = response.data.genealogy
				_self.bookData = data
				_self.section1 = data.section1
				_self.section2 = data.section2
				_self.section3 = data.section3
				for (var i = 0; i < data.section4.length; i++) {
					_self.section4 += data.section4[i].name
				}
				_self.section5 = data.section5
				_self.section6 = data.section6
				_self.section7 = data.section7
				_self.section8 = data.section8
				_self.section8Pic = data.section8.pictures.join(',')
				_self.section9 = data.section9
				_self.section10 = data.section10
				/**
				 * 初始化
				*/
				_self.$nextTick(() => {
					_self.loading(_self)
					_self.animate = false
				})
				//
			})
	},
	mounted() {
		tragtouch('ul.bar')
	},
	methods: {
		loading(self) {
			var i = getPhoneType()
			var ths = 18
			var fths = 6
			var vths = 14
			var thsRE = 7
			var fths2 = 6
			if (i === 4 || i === 5) {
				ths = 13
				fths = 4
				vths = 12
				thsRE = 5
				fths2 = 5
			}
			self.index[0] = pagetion('.flipbook', '.vis1', self.titles[0].name, ths, 1)
			self.index[1] = pagetion('.flipbook', '.vis2', self.titles[1].name, ths, self.index[0])
			self.titles[1].index = zero(self.index[0])
			self.index[2] = pagetionV('.flipbook', '.vis3', self.titles[2].name, vths, self.index[1])
			self.titles[2].index = zero(self.index[1])
			self.index[3] = pagetionRE('.flipbook', self.section4, self.titles[3].name, thsRE, self.index[2])
			self.titles[3].index = zero(self.index[2])
			self.index[4] = pagetionIMG('.flipbook', '.vis5_main', self.titles[4].name, ths, fths, self.index[3])
			self.titles[4].index = zero(self.index[3])
			var index4 = self.index[4].pop()
			self.index[5] = pagetionLs('.flipbook', self.section6, self.titles[5].name, fths2, index4)
			self.titles[5].index = zero(index4)
			self.index[6] = pagetionFR('.flipbook', self.section7, self.titles[6].name, 4, self.index[5])
			self.titles[6].index = zero(self.index[5])
			self.index[7] = pagetionIMG('.flipbook', '.vis8_main', self.titles[7].name, ths, fths, self.index[6])
			self.titles[7].index = zero(self.index[6])
			var index7 = self.index[7].pop()
			self.index[8] = pagetionPS('.flipbook', self.section9, self.titles[8].name, index7)
			self.titles[8].index = zero(index7)
			self.index[9] = pagetion('.flipbook', '.vis10', self.titles[9].name, ths, self.index[8])
			self.titles[9].index = zero(self.index[8])
			loadApp(self.index[9])
			goto()
			bg('.bg', '.photo2', '.bg_main', '.li2', '.li1', '.li3')
		},
		turn(page) {
			$('.flipbook').turn('page', page)
			this.hide()
		},
		hide() {
			$('.modal.index').stop().animate({ left: '-92%' }, 400, 'swing', () => {
				$(this).stop().hide()
				$('.modal.index .button').stop().hide()
			})
		},
		show() {
			$('.modal.index').stop().show().stop().animate({ left: 0 }, 400, 'swing')
			$('.modal.index .button').stop().show().stop().animate({ left: '100%' }, 400, 'swing')
		},
		href() {
			this.$router.push('/oauthJoin')
		}
	}
}
</script>

<style lang="scss">
@import './basic.css';
@import './main.scss';
@import './loading.scss';
</style>