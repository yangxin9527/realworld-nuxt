<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">
          conduit
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                    class="nav-link"
                    exact
                    :class="{
                      active:tab==='your_feed'
                    }"
                    :to="{
                      name:'index',
                      query:{
                        tab:'your_feed'
                      }
                    }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                    class="nav-link"
                    exact
                    :class="{
                      active:(tab==='global_feed')
                    }"
                    :to="{
                      name:'index',
                       query:{
                        tab:'global_feed'
                      }
                    }"

                >
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                    v-if="tag"
                    :class="{
                      active:(tab==='tag')
                    }"
                    :to="{
                      name:'index',
                       query:{
                        tag,
                        tab:'tag'
                      }
                    }"
                    class="nav-link active">
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="item in list" :key="item.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                name:'profile',
                query:{
                  username:item.author.username
                }
              }">
                <img :src=" item.author.image">
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{
                name:'profile',
                query:{
                  username:item.author.username
                }
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
            <nuxt-link :to="`article/${item.slug}`" class="preview-link">
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <ul class="pagination">
            <li class="page-item" :class="{active: page === item }" v-for="item in totalPage" :key="item">
              <nuxt-link class="page-link ng-binding" :to="{
               name:'index',
               query:{
                 page:item,
                 tab,
                 tag,
               }
             }">{{ item }}
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link :to="{
                name:'index',
                query:{
                  tag,
                  tab:'tag'
                }
              }" :key="index" v-for="(tag,index) in tags" class="tag-pill tag-default">
                {{ tag }}
              </nuxt-link>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addFavorite, getArticles, getFeedArticles,deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tags'
import { mapState } from 'vuex'
export default {
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData ({ query ,store }) {
    // query 取 url 参数
    const page = Number(query.page || 1)
    const {tab,tag} = query
    const limit = 20;
    const loadArticles = store.state.user && tab === 'your_feed'
    ? getFeedArticles :getArticles;

    const [articlesRes, tagsRes] = await Promise.all([
      loadArticles({
        tag,
        limit,
        offset: (page - 1) * limit
      }),
      getTags()
    ])
    const { articles, articlesCount } = articlesRes.data
    const { tags } = tagsRes.data
    articles.forEach(article=>article.favoriteDisabled=false)
    return {
      list: articles,
      count: articlesCount,
      page,
      limit,
      tags: tags,
      tag,
      tab: query.tab || ''
    }
  },
  methods: {
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
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.count / this.limit)
    }
  },
  mounted () {

  },
  data () {
    return {
      tab: 'global_feed'
    }
  }
}
</script>

<style>

</style>
