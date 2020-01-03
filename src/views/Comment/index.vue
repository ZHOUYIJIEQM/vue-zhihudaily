<template>
  <div class="comment-page" v-show="comments.length>0">
    <div class="comment-header">
      <div class="comment-back iconfont icon-fanhui" @click="back"></div>
      <div class="comment-num">{{commentNum}} 条评论</div>
    </div>
    <div class="comment-content">
      <div class="content-list" v-for="(item, index) in comments" :key="index">
        <div class="comment-pic">
          <img :src="HANDLERIMG(item.avatar)" alt="" />
        </div>
        <div class="comment-author">{{item.author}}</div>
        <div class="comment-content">{{item.content}}</div>
        <div class="comment-time">{{item.time}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api'
  import {HANDLERIMG} from '@/utils/index.js'
  export default {
    data(){
      return {
        commentNum: null,
        comments: [],
      }
    },
    mounted(){
      this.getComment(this.$route.params.id)
    },
    methods: {
      HANDLERIMG,

      back(){
        this.$router.back();
      },

      getComment(id){
        api.getStoryExtraById(id).then( (res) => {
          this.commentNum = res.short_comments
        })
        api.getShortCommentsById(id).then( (res) => {
          console.log(res)
          this.comments = res.comments;

        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  $height: 40px;
  .comment-page{
    .comment-header{
      height: $height;
      line-height: $height;
      border-bottom: 1px solid #e2e2e2;
      .comment-back{
        position: absolute;
        // width: $height;
        padding: 0 10px;
        height: $height;
        line-height: $height;
        left: 0;
        top: 0;
        font-weight: 600;
      }
      .comment-num{
        text-align: center;
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
</style>