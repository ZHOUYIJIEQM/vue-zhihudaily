<template>
  <div class="comment-page" v-show="comments.length>0">
    <div class="comment-header">
      <div class="comment-back iconfont icon-fanhui" @click="back"></div>
      <div class="comment-num">{{commentNum}} 条评论</div>
    </div>
    <div class="comment-content">
      <div class="content-list" v-for="(item, index) in comments" :key="index">
        
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api'
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