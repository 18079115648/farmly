<template>
</template>

<script>
    import axios from 'axios'
	export default {
		data() {
			return {
				browserType: 1,
				type: ''
			}
		},
		created() {
			this.isBrowser()
			this.browserType = 1
			this.type = 'WECHAT'
			this.wxInitToken()
		},
		mounted() {},
		methods: {
			isBrowser() {
				var ua = navigator.userAgent.toLowerCase()
				if (/micromessenger/.test(ua)) {
					this.browserType = 1
					this.type = 'WECHAT'
				} else if (/qqbrowser/.test(ua)) {
					this.browserType = 2
					this.type = 'QQ'
				} else {
					this.browserType = 1
					this.type = 'WECHAT'
				}
			},
			GetQueryString(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				var r = window.location.search.substr(1).match(reg)
				if (r != null) return unescape(r[2])
				return null
			},
			wxInitToken() {
				const Code = this.GetQueryString('code')
//				window.location.href = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + this.$store.state.appId + '&secret=' + this.$store.state.appId + '&code=' + Code + '&grant_type=authorization_code'
				if (Code) {
					axios.get('/wx-api/sns/oauth2/access_token?appid=' + this.$store.state.wxAppId + '&secret=' + this.$store.state.wxAppSecret + '&code=' + Code + '&grant_type=authorization_code').then((res) => {
						console.log(res)
						console.log(res.data)
						if (res.data.openid) {
							this.$store.state.openId = res.data.openid
							this.$store.state.access_token = res.data.access_token
							this.wxInitUserInfo(res.data.openid, res.data.access_token)
						}
					})
				}
			},
			wxInitUserInfo(openId, token) {
				axios.get('/wx-api/sns/userinfo?access_token=' + token + '&openid=' + openId + '&lang=zh_CN').then((res) => {
					console.log(res)
					console.log(res.data)
					if (res.data.openid) {
						this.joinFarmily(res.data.headimgurl, res.data.nickname, res.data.unionid)
					}
				})
			},
			qqInitToken() {
				const Code = this.GetQueryString('code')
//				window.location.href = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=1106109912&client_secret=aiWIhALixQiDEsHs&code=' + Code + 'redirect_uri=' + encodeURIComponent('http://192.168.0.52:8080/oauthJoin')
				if (Code) {
					axios.get('/qq-api/oauth2.0/token?grant_type=authorization_code&client_id=' + this.$store.state.qqAppId + '&client_secret=' + this.$store.state.qqAppSecret + '&code=' + Code + '&redirect_uri=' + encodeURIComponent('http://h5.yunjiapu.com.cn/skipPage')).then((res) => {
						var params = res.data.split('&')[0].split('=')[1]
						if (params) {
							this.$store.state.access_token = params
							this.qqInitOpenId(params)
						}
					})
				}
			},
			qqInitOpenId(token) {
				axios.get('/qq-api/oauth2.0/me?access_token=' + token).then((res) => {
					var start = res.data.indexOf('{')
					var end = res.data.indexOf('}')
					var data = JSON.parse(res.data.substring(start, end + 1))
					if (data.openid) {
						this.$store.state.openId = data.openid
						this.qqInitUserInfo(data.openid)
					}
				})
			},
			qqInitUserInfo(openId) {
				axios.get('/qq-api/user/get_user_info?access_token=' + this.$store.state.access_token + '&oauth_consumer_key=' + this.$store.state.qqAppId + '&openid=' + openId).then((res) => {
					if (res.data.ret === 0) {
						this.joinFarmily(res.data.figureurl_qq_1, res.data.nickname)
					}
				})
			},
			joinFarmily(avatar, nickname, unionId) {
				var self = this
//				var inviter = localStorage.getItem('addInviteR')
//				var genealogy = localStorage.getItem('addID')
				axios.post(self.$store.state.uri + 'application/oauth', {
                    avatar: avatar,
					genealogy_id: 1,
					nickname: nickname,
					open_id: this.$store.state.openId,
					inviter_id: 1,
					type: this.type,
					union_id: unionId
                }, {
                    headers: {
                        'version': '1.1'
                    }
                }).then((response) => {
                    if (response.data.err_code !== 0 || response.data.err_code !== 200) {
                        alert(response.data.err_msg)
                    }
                    if (response.data.genealogy.cover === null || response.data.genealogy.cover === undefined || response.data.genealogy.cover === '') {
                        alert('服务器发生一个错误,请稍后再试')
                    }
                    self.$store.dispatch('addGenealogy', {cover: response.data.genealogy.cover, name: response.data.genealogy.name})
                    self.$router.push('/success')
                })
                .catch(function (error) {
                    console.log(error)
                })
			}
		}
		/*
		watch: {
		    phone: (val, oldVal) => {
		        console.log('new: %s, old: %s', val, oldVal)
		    }
		}
		*/
	}
</script>
