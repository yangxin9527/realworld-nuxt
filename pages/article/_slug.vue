<template>
  <div class="article-page">
  <div class="banner">
    <div class="container">

      <h1>{{ article.title }}</h1>
      <ArticleMeta :article="article" />


    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body">
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <ArticleMeta :article="article" />
    </div>

    <ArticleComments :article="article"/>

  </div>

</div>
</template>

<script lang="ts">
import Vue from 'vue'
import MarkdownIt from 'markdown-it'
import {getArticle} from '@/api/article'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'

export default Vue.extend({
  head(){
    return{
      title:`${this.article.title} - RealWorld`,
      meta:[
        {hid:'description',name:'description',content:this.article.description}
      ]
    }
  },
  async asyncData({params}){
    console.log(params)
     const {data} = await getArticle(params&&params.slug)
    const {article} =data;
    const md = new MarkdownIt();
    article.body = md.render(article.body)

    return {
      article
    }
  },
  components:{
    ArticleMeta,
    ArticleComments,
  },
  data(){
    return{

    }
  }

})
</script>

<style>

</style>
