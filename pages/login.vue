<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="register">Need an account?</nuxt-link>
            <nuxt-link v-else to="login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for='(messages,field) in errors'>
              <li :key='index' v-for='(message,index) in messages'>{{field}} {{message}}</li>

            </template>
          </ul>
        {{$store.user}}
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                v-model="user.username"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.email"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.password"
                type="password"
                placeholder="Password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<!--bio: null-->
<!--createdAt: "2021-03-18T14:00:23.053Z"-->
<!--email: "yangheroxin@gmail.com"-->
<!--id: 150843-->
<!--image: null-->
<!--token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUwODQzLCJ1c2VybmFtZSI6IuadqOaYlSIsImV4cCI6MTYyMTI2NDY2Mn0.XGOSJ6cXSq5pe9WDdbywxd49avvI_tKImTkpCklE2Ds"-->
<!--updatedAt: "2021-03-18T14:00:23.058Z"-->
<!--username: "杨昕"-->

<script>
import request from "@/utils/request";
import {login,register} from '@/api/user'
const Cookie = process.client? require('js-cookie') :undefined
export default {
  middleware:'notAuthenticated',
  computed: {
    isLogin(vm) {
      return vm.$route.name === "login";
    },
  },
  methods: {
    async onSubmit() {
      try {
        if (this.isLogin) {
          const { data } = await login({
            user: this.user,
          })
          this.$store.commit('setUser',data.user)
          //数据持久化
          Cookie.set('user',data.user)
          this.$router.push('/')
        } else {
          const { data } = await register({
            user: this.user,
          })
          this.$store.commit('setUser',data.user)
          //数据持久化
          Cookie.set('user',data.user)
          this.$router.push('/')

        }
      } catch (error) {
        this.errors = error.response.data.errors
      }
       
//           bio: null
// createdAt: "2021-03-10T14:45:55.066Z"
// email: "364332625@qq.com"
// id: 148548
// image: null
// token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQ4NTQ4LCJ1c2VybmFtZSI6IuadqOaYlTEiLCJleHAiOjE2MjEyNTg1NTZ9.pdGpInT8X_5ra5xttq43jyHli8ZRnV_FrB-erfjtLbw"
// updatedAt: "2021-03-10T14:46:24.656Z"
// username: "杨昕1"


    },
  },
  data() {
    return {
      errors:{},
      user: {
        email: "",
        password: "",
        username: "",
      },
    };
  },
};
</script>

<style>
</style>
