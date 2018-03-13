<template>
	<section>
		<div class="oauth-join">
			<div class="oauth-icon wexin" v-if="browserType==1"></div>
			<div class="oauth-icon qq" v-else></div>
			<div class="oauth-confirm-btn" @click="oauthLogin" v-show="disabled">申请加入</div>
			<div class="oauth-confirm-btn disabled" v-show="!disabled">申请加入</div>
		</div>
		<article>
			<div class="title">温馨提醒</div>
			<P>1.同意后，您将加入新的家谱，老家谱失效；</P>
			<p>2.若您是家谱创建者，加入新家谱后，老家谱成员将全部加入到新家谱！</p>
		</article>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				browserType: 1,
				disabled: true
			}
		},
		created() {
			this.isBrowser()
			this.browserType = 2
		},
		mounted() {},
		methods: {
			isBrowser() {
				var ua = navigator.userAgent.toLowerCase()
				if (/micromessenger/.test(ua)) {
					this.browserType = 1
				} else if (/qqbrowser/.test(ua)) {
					this.browserType = 2
				} else {
					this.browserType = 1
				}
			},
			oauthLogin() {
				this.disabled = false
				this.browserType = 2
				if (this.browserType === 1) {
					window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + this.$store.state.wxAppId + '&redirect_uri=' + encodeURIComponent('http://h5.yunjiapu.com.cn/skipPage') + '&response_type=code&scope=snsapi_login&state=tcjp#wechat_redirect'
				} else {
					window.location.href = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + this.$store.state.qqAppId + '&redirect_uri=' + encodeURIComponent('http://h5.yunjiapu.com.cn/skipPage') + '&state=tcjp&scope=get_user_info&diaplay=mobile&g_ut=2'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './join.scss';
	.mu-badge.mu-badge-secondary {
		font-size: .2rem;
	}
	
	.mu-badge-container.badge {
		margin-top: .36rem;
		float: right;
		line-height: .3rem;
		text-align: center;
		em {
			width: .3rem;
			height: .3rem;
			border-radius: 50%;
		}
	}
	
	.btn-Verification {
		color: #ffb74d;
	}
	
	fieldset span {
		color: #ccc;
	}
	
	.oauth-join {
		padding-top: 0.5rem;
	}
	
	.oauth-icon {
		width: 2rem;
		height: 2rem;
		margin: 0.3rem auto;
		background-size: 100% 100%;
	}
	
	.oauth-icon.qq {
		background-image: url(image/qq.png);
	}
	
	.oauth-icon.wexin {
		background-image: url(image/wexin.png);
	}
	
	.oauth-confirm-btn {
		margin: 0 0.3rem;
		height: 0.8rem;
		border-radius: .1rem;
		background-color: #B68957;
		line-height: .76rem;
		color: #fff;
		font-weight: 600;
		margin-top: 1.2rem;
		font-size: 0.30rem;
		text-align: center;
		letter-spacing: 4px;
	}
	.oauth-confirm-btn.disabled{
		opacity: 0.8;
	}
</style>