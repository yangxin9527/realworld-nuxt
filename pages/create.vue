<template>
 <div class="editor-page">
  <div class="container page">
    <div class="row">
      <ul class="error-messages">
        <template v-for='(messages,field) in errors'>
          <li :key='index' v-for='(message,index) in messages'>{{field}} {{message}}</li>
        </template>
      </ul>
      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset class="form-group">
                <input type="text" v-model="title" required class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" v-model="description" required class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" v-model="body" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" v-model="tag"  @keydown.enter.prevent="enterTag" class="form-control" placeholder="Enter tags">
              <div class="tag-list">
                <span v-for="(item,index) in tagList" :key="item" class="tag-default tag-pill ng-binding ng-scope">
                  <i class="ion-close-round"  @click="deleteTag(index)"></i>
                  {{item}}
                </span>
              </div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="submit" >
              {{slug?'Edit Article':'Publish Article'}}

            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script >
import {createArticle,getArticle,updateArticle } from '@/api/article'
export default {
  middleware:'authenticated',
  data(){
    return{
      title: "",
      description: "",
      body: "",
      tag:'',
      tagList:[],
      errors:[],
      slug:''
    }
  },

  mounted () {
    this.initData();

  },

  methods:{
    async initData(){
      const slug = this.$route.query.slug;
      if(slug){
        const { data } = await getArticle(slug)
        if(data&&data.article){
          const article = data.article
          this.title = article.title
          this.body = article.body
          this.description = article.description
          this.tagList = article.tagList
          this.slug=slug

        }

      }
    },
    enterTag(){
      const value = this.tag.trim()
      if(value !== ''&&this.tagList.indexOf(value)=== -1){
        this.tag=''
        this.tagList.push(value)
      }
    },
    deleteTag(index){
      this.tagList.splice(index,1)
    },
    async onSubmit(){

      const { title, body, description,tagList,slug} = this

      let res ;
      if(slug){
        res = await updateArticle(slug,{
          "article": {
            title,
            description,
            body,
            tagList
          }
        })
      }else{
        res = await createArticle({
          "article": {
            title,
            description,
            body,
            tagList
          }
        })
      }

      const data = res.data;
      if(data&&data.article){
        this.$router.push({
          path:`/article/${data.article.slug}`
        });
      }
    }
  }

}
</script>

<style>

</style>
