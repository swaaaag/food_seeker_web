<template>
  <div class="page">
    <nav-bar></nav-bar>
    <login-header :title="title" class="header"></login-header>
    <login-input
      label="邮箱"
      v-model="email"
      :error="emailError">
    </login-input>
    <login-input
      type="password"
      label="密码"
      v-model="password"
      :error="passwordError"
      :messages="passwordMessages">
    </login-input>
    <main-button @confirm="onConfirm">登录</main-button>
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from 'components/nav-bar/nav-bar'
import LoginHeader from 'components/header/header'
import LoginInput from 'components/input/input'
import MainButton from 'components/main-button/main-button'
import * as types from 'store/mutation-types'
import User from 'models/user'

export default {
  name: 'Login',
  components: {
    NavBar,
    LoginHeader,
    LoginInput,
    MainButton
  },
  data () {
    return {
      title: '登录开饭',
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      passwordMessages: []
    }
  },
  methods: {
    onConfirm () {
      if (!this.emailError && !this.passwordError) {
        const EMAIL = 100
        this.$store.commit(types.SET_EMAIL, this.email)
        User.login({
          account: this.email,
          secret: this.password,
          type: EMAIL
        })
          .then((data) => {
            this.$store.commit(types.SET_TOKEN, data.token)
            this.$router.back()
          })
          .catch(() => {
            this.passwordMessages = ['邮箱或密码错误']
          })
      }
    },
    checkEmail () {
      var reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      return reg.test(this.email)
    },
    checkPassword () {
      return this.password !== ''
    }
  },
  mounted () {
    this.email = this.$store.state.email
  },
  watch: {
    email (value) {
      if (!this.checkEmail(value)) {
        this.emailError = true
        return
      }
      this.emailError = false
    },
    password (value) {
      if (!this.checkPassword(value)) {
        this.passwordError = true
        return
      }
      this.passwordError = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.page
  display: flex
  flex-direction: column
  align-items: center
  .header
    margin-bottom: 48px
</style>
