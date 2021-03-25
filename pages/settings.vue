<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <Error :errors="errors" />
        <form @submit.prevent="onSubmit">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" v-model="image" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" required v-model="username"  type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" v-model="bio" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" required type="text" v-model="email" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" v-model="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script >
import Vue from 'vue'
import {mapState} from 'vuex'
import { UpdateUser } from '~/api/user'
import Error from '~/pages/components/error'
const Cookie = process.client? require('js-cookie') :undefined

export default Vue.extend({
  components:{
    Error
  },
  data(){
    return{
      ...this.$store.state.user,
      password:'',
      errors: {  }
    }
  },
  mounted () {
  },
  methods:{
    async onSubmit(){
      const {email, bio, image,password,username} = this
      let user = {
        email,
        bio,
        image,
        username
      }
      if(password){
        user.password= password
      }
      try {
        const {data} = await UpdateUser({
          user
        })
        if(data){
          console.log(data)
          this.$store.commit('setUser',data.user)
          //数据持久化
          Cookie.set('user',data.user)
          alert('set user success')

        }
      }catch (error){
        this.errors = error.response.data.errors
      }

    }
  }
})
</script>

<style>

</style>
