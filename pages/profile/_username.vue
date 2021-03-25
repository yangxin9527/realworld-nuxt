<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{ profile.username }}</h4>
          <p>
            {{ profile.bio }}
          </p>
          <nuxt-link to="/settings" v-if="isMe" class="btn btn-sm btn-outline-secondary action-btn">
            Edit Profile Settings
          </nuxt-link>
          <button v-else class="btn btn-sm btn-outline-secondary action-btn"
                  :class="{
                    active:profile.following
                  }"
                  @click="onFollow(profile)">
            <i class="ion-plus-round"></i>
            Follow {{ profile.username }}
          </button>


        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link
                  :to="{
                    path:'/profile/'+username,
                    query:{
                      tab:'my_article'
                    }
                  }"
                  class="nav-link"
                  exact
                  :class="{
                    active:tab==='my_article'
                  }"
              >My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                  exact
                  :to="{
                    path:'/profile/'+username,
                    query:{
                      tab:'my_favorited'
                    }
                  }"
                  class="nav-link"
                  :class="{
                    active:tab==='my_favorited'
                  }"
              >Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="item in articles" :key="item.slug">
          <div class="article-meta">
            <nuxt-link :to="{
                  path:'/profile/'+item.author.username
              }">
              <img :src=" item.author.image">
            </nuxt-link>
            <div class="info">
              <nuxt-link :to="{
                path:'/profile/'+item.author.username
              }" class="author">
                {{ item.author.username }}
              </nuxt-link>
              <span class="date">{{ item.createdAt | date('MMM DD,YYYY') }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{
                active:item.favorited
              }"
                    :disabled="item.favoriteDisabled"
                    @click="onFavorite(item)"
            >
              <i class="ion-heart"/> {{ item.favoritesCount }}
            </button>
          </div>
          <nuxt-link :to="`/article/${item.slug}`" class="preview-link">
            <h1>{{ item.title }}</h1>
            <p>{{ item.description }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>

        <ul class="pagination">
          <li class="page-item" :class="{active: page === item }" v-for="item in totalPage" :key="item">
            <nuxt-link class="page-link ng-binding" :to="{
               path:'/profile/'+username,
               query:{
                 page:item,
                 tab
               }
             }">{{ item }}
            </nuxt-link>
          </li>
        </ul>


      </div>

    </div>
  </div>

</div>
</template>

<script>
import Vue from 'vue'
import { follow, getProfile, unFollow } from '~/api/user'
import { addFavorite, deleteFavorite, getArticles } from '~/api/article'
import { mapState } from '_vuex@3.6.2@vuex'

export default Vue.extend({
  watchQuery:['tab','page'],
  async asyncData({params,query,store}){
    let username = ''
    let profile = { };
    let isMe=false;
    if(params&&params.username){
      username = params.username
      if(store&&store.state.user){
        isMe= store.state.user.username ===username
      }
    }else{
      if(store&&store.state.user){
        username = store.state.user.username
        isMe=true
      }
    }
    console.log(isMe)
    if(!username){
      return null
    }

    const limit = 2;
    const page = Number(query.page || 1)
    const tab = query.tab || 'my_article'
    let articles = [];
    let articlesCount = 0;
    // author=jake
    let apiParams = {}
    if(tab === 'my_article'){
      apiParams.author = username
    }else{
      apiParams.favorited = username
    }
    const [articlesRes, profileData] = await Promise.all([
      getArticles({
        limit,
        ...apiParams,
        offset: (page - 1) * limit
      }),
      getProfile(username)
    ])
    console.log('---')
    try{
      articles = articlesRes.data.articles
      articles.forEach(article=>article.favoriteDisabled=false)

      articlesCount = articlesRes.data.articlesCount
      // const {data = articleData} =articleListData
      //   console.log(articleData)

    }catch (err){

    }


    try{
      const {data} =profileData
      profile = data.profile

    }catch (err){
      console.log(err)
    }
    return {
      articles,
      count:articlesCount,
      limit,
      isMe,
      profile,
      tab,
      page,
      username
    }

  },
  data(){
    return{
      disabledFollow:false
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.count / this.limit)
    }
  },
  methods:{
    async onFavorite(article){
      if(article.favorited){
        article.favoriteDisabled = true
        await deleteFavorite(article.slug)
        article.favoriteDisabled = false
        article.favorited=false
        article.favoritesCount -=1
      }else{
        article.favoriteDisabled = true
        await addFavorite(article.slug)
        article.favoriteDisabled = false
        article.favorited=true
        article.favoritesCount +=1
      }
    },
    async onFollow(profile){
      let res ,username = profile.username;

      this.disabledFollow=true;
      if(profile.following){
        res = await unFollow(username)
      }else{
        res = await  follow(username)
      }
      this.disabledFollow=false;
      const {data } = res;
      console.log(data.profile)
      if(data.profile){
        profile.following=data.profile.following
      }
    },
  }
})
</script>

<style>

</style>
