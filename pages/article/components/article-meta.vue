<template>
  <div class="article-meta">
    <nuxt-link :to="{
      path:'/profile/'+article.author.username,
    }" ><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link :to="{
      path:'/profile/'+article.author.username,

    }"  class="author">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createAt | date('MMM DD, YYYY')}}</span>
    </div>
    <template v-if="user&&user.username===article.author.username">

      <nuxt-link :to="{
      path:'/create',
      query:{
        slug:article.slug
      }
    }"  class="btn btn-sm btn-outline-secondary">edit</nuxt-link>

      <button
          class="btn btn-sm btn-outline-secondary"
          @click="onDelete"
      >
        &nbsp;delete
      </button>
    </template>
    <template v-else>

      <button
          class="btn btn-sm btn-outline-secondary"
          :disabled="disabledFollow"
          :class="{
          active:article.author.following
        }"
          @click="onFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow {{ article.author.username }}
      </button>
      <button
          @click="onFavorite"
          :disabled="disabledFavorite"
          class="btn btn-sm btn-outline-primary"
          :class="{
          active:article.favorited
        }"
      >

        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>
<script>
import {follow,unFollow,} from '~/api/user'
import {deleteFavorite,addFavorite,deleteArticle} from '~/api/article'
import { mapState } from 'vuex'

export default {
  props:{
    article:{
      type:Object,
      required:true
    }
  },
  computed:{
    ...mapState(['user'])
  },
  data(){
    return{
      disabledFollow:false,
      disabledFavorite:false,
    }
  },
  methods:{
    async onFollow(){
      let res ,username = this.article.author.username;
      this.disabledFollow=true;
      if(this.article.author.following){
        res = await unFollow(username)
      }else{
        res = await  follow(username)
      }
      this.disabledFollow=false;
      const {data } = res;
      if(data.profile){
        this.article.author.following=data.profile.following
      }
    },
    async onFavorite(){
      this.disabledFavorite=true;
      let res ,slug = this.article.slug;
      if(this.article.favorited){
        res = await  deleteFavorite(slug)
      }else{
        res = await addFavorite(slug)
      }
      this.disabledFavorite=false;
      const {data } = res;
      if(data&&data.article){
        this.article.favorited=data.article.favorited
        this.article.favoritesCount=data.article.favoritesCount
      }
    },
    async onDelete(){
      await deleteArticle(this.article.slug)
      this.$router.push('/')
    }
  }
}
</script>