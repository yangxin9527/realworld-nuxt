<template>
  <div class="row">

    <div class="col-xs-12 col-md-8 offset-md-2">

      <div class="card comment-form">
        <div class="card-block">
          <textarea ref="body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
        </div>
        <div class="card-footer">
          <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
          <button class="btn btn-sm btn-primary" @click="add" :disabled="disabled">
            Post Comment
          </button>
        </div>
      </div>

      <div class="card" v-for="(item,index) in comments" :key="item.id">
        <div class="card-block">
          <p class="card-text">{{item.body}}</p>
        </div>
        <div class="card-footer">
          <nuxt-link to=''  class="comment-author">
            <img :src="item.author.image" class="comment-author-img" />
          </nuxt-link>
          &nbsp;
          <nuxt-link to=''  class="comment-author">{{item.author.username}}</nuxt-link>
          <span class="date-posted">{{item.updatedAt | date('MMM DD, YYYY')}}</span>
          <button @click="deleteComment(item.id,index)" >delete</button>
        </div>
      </div>

    </div>

  </div>

</template>
<script>
import {getComments,addComments,deleteComment} from '@/api/article'
export default {
  props:{
    article:{
      type:Object,
      required:true
    }
  },
  data(){
    return{
      comments:[],
      disabled:false,
    }
  },
  async mounted(){
    const {data}= await getComments(this.article.slug)
    console.log(data)
    this.comments =data.comments
  },
  methods:{
    async add(){
      const value= this.$refs.body.value;
      if(value.trim()){
        this.disabled=true
        const {data } = await addComments({
          slug:this.article.slug,
          data:{
            "comment": {
              "body": value.trim()
            }
          }
        })
        this.$refs.body.value = ''
        this.disabled=false

        this.comments.push(data.comment)
      }

    },
    async deleteComment(id,index){
      const {data} = await deleteComment({ id,slug:this.article.slug });
      if(data){
        this.comments.splice(index,1)
      }
    }
  }
}
</script>