<template>
    <section>
        <form name="userInfo" role="from" @submit.prevent="turn">
            <fieldset>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shouji"></use>
                </svg>
                <!--
                <input name="phone" v-model="phone" type="tel" placeholder="请输入手机号" @focus="ba1=false"/>
                <mu-badge class="badge" v-if="ba1" content="!" secondary slot="right"/>
                -->
                <input name="phone" v-model="phone" type="tel" placeholder="请输入手机号"/>
            </fieldset>
            <fieldset class="Verification-group">
                <svg class="icon" aria-hidden="true" style="font-size: .32rem">
                    <use xlink:href="#icon-yanzhengyanzhengma"></use>
                </svg>
                <!--
                <input name="Verification" v-model="Verification" type="text" placeholder="请输入验证码" @focus="ba2=false"/>
                <input name="btn" value="| 获取验证码" type="button" class="btn-Verification" @click="spend" v-if="!timer" />
                <span v-if="timer">{{timerNum}}s</span>
                <mu-badge class="badge" v-if="ba2" content="!" secondary slot="right"/>
                -->
                <input name="Verification" v-model="Verification" type="text" placeholder="请输入验证码"/>
                <input name="btn" value="| 获取验证码" type="button" class="btn-Verification" @click="spend" v-if="!timer"/>
                <span v-if="timer" class="tim">{{timerNum}}s</span>
            </fieldset>
            <fieldset>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                </svg>
                <!--
                <input name="name" v-model="name" type="text" placeholder="请输入姓名" @focus="ba3=false"/>
                <mu-badge class="badge" v-if="ba3" content="!" secondary slot="right"/>
                -->
                <input name="name" v-model="name" type="text" placeholder="请输入姓名"/>
            </fieldset>
            <input name="join" type="submit" value="申请加入" v-if="btn" />
            <input name="join" type="submit" class="submit2" disabled value="申请加入" v-if="!btn" />
        </form>
        <article>
            <div class="title">温馨提醒</div>
            <P>1.同意后，您将加入新的家谱，老家谱失效；</P>
            <p>2.若您是家谱创建者，加入新家谱后，老家谱成员将全部加入到新家谱！</p>
        </article>
    </section>
</template>

<script>
import axios from 'axios'
import { checkMobile, checkName, checkCode } from '../../static/js/app.js'
import '../../static/js/iconfont2.js'
    export default {
        data() {
            return {
                ba1: false,
                ba2: false,
                ba3: false,
                phone: '',
                Verification: '',
                name: '',
                timer: false,
                timerNum: 60,
                btn: true
            }
        },
        created() {},
        mounted() {},
        methods: {
            turn() {
                var self = this
                // var inviter = GetQueryString('inviter_id')
                // var genealogy = GetQueryString('genealogy_id')
                if (checkMobile(self.phone) && checkName(self.name) && checkCode(self.Verification)) {
                    axios.post(self.$store.state.uri + 'application', {
                        captcha: self.Verification,
                        genealogy_id: self.$store.state.genealogy_id,
                        mobile: self.phone,
                        name: self.name,
                        inviter_id: self.$store.state.inviter_id
                    }, {
                        headers: {
                            'version': '1.1'
                        }
                    })
                    .then(function (response) {
                        // console.log(response)
                        // var cover = response.genealogy.cover
                        // var name = response.genealogy.name
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
                } else {
                    if (checkMobile(self.phone) === false) {
                        self.ba1 = true
                    } else {
                        self.ba1 = false
                    }
                    if (checkCode(self.Verification) === false) {
                        self.ba2 = true
                    } else {
                        self.ba2 = false
                    }
                    if (checkName(self.name) === false) {
                        self.ba3 = true
                    } else {
                        self.ba3 = false
                    }
                }
                self.btn = false
                clearTimeout(oneTimer)
                var oneTimer = setTimeout(() => {
                    self.btn = true
                }, 1080)
            },
            spend() {
                var self = this
                if (self.phone !== undefined && self.phone !== null && self.phone !== '') {
                    this.timer = true
                    clearInterval(time)
                    var time = setInterval(() => {
                        if (this.timerNum > 0) {
                            this.timerNum--
                        } else {
                            clearInterval(time)
                            this.timer = false
                            this.timerNum = 60
                        }
                    }, 1000)
                    axios.post(self.$store.state.uri + 'application/captcha', {
                        mobile: self.phone
                    })
                    .then(function(response) {
                        console.log(response)
                    })
                    .catch(function(error) {
                        console.log(error)
                    })
                }
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
</style>