<template>
  <div class="comment-page" v-show="comments.length>0">
    <div class="comment-header">
      <div class="comment-back iconfont icon-fanhui" @click="back"></div>
      <div class="comment-num">{{commentNum}} 条评论</div>
    </div>
    <div class="comments-content">
      <div class="content-list" v-for="(item, index) in comments" :key="index">
        <div class="comment-pic">
          <img :src="HANDLERIMG(item.avatar)" alt="" />
        </div>
        <div class="comment-comments">
          <div class="comment-author">
            <div class="author-name">{{item.author}}</div>
            <div class="comment-more">
              <!-- <pre>
                  =====
                  {{typeof isShow[index]}}
                  =====
                </pre> -->
              <span class="iconfont icon-htmal5icon26" @click="show(index)"></span>
              <div class="more-content" v-show="isShow[index]">
                
                <p @touchstart="copyComment(index)" @touchend="tend" :class="{active: p1isActive}">复制</p>
                <p @touchstart="p2isActive = !p2isActive" @touchend="p2isActive = !p2isActive; isShow.splice(0)" :class="{active: p2isActive}">举报</p>
              </div>
              <div class="mask" @click.stop="mask(index)" v-show="isShow[index]"></div>
            </div>
          </div>
          <div class="comment-content" :ref="'content'+index">{{item.content}}</div>
          <div class="comment-time">{{HANDLERTIME(item.time)}}</div>
        </div>
        
      </div>
    </div>
    <div class="all-comment">已显示全部评论</div>
    <div class="comment-footer">
      <div class="your-pic">
        <span data-v-2f029f00="" class="iconfont icon-zhihu"></span>
      </div>
      <div class="your-comment">
        <input type="text" placeholder="说说你的看法..." />
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api'
  import {HANDLERIMG, HANDLERTIME, COPY} from '@/utils/index.js'
  export default {
    data(){
      return {
        commentNum: null,
        comments: [],
        isShow: [],
        p1isActive: false,
        p2isActive: false,
      }
    },
    mounted(){
      this.getComment(this.$route.params.id)
    },
    methods: {
      HANDLERIMG,
      HANDLERTIME,
      COPY,

      copyComment(num){
        this.p1isActive = true;
        let contentNum = "content"+num;
        // console.log(contentNum)
        let str = this.$refs[contentNum][0].innerText;
        // console.log(str.innerText)
        COPY(str)
      },

      tend(){
        this.p1isActive = false;
        this.isShow.splice(0)
      },

      show(num){
        this.isShow.splice(0)
        this.$set(this.isShow, num, 1)
      },
      mask(num){
        // console.log('mask click');
        this.isShow.splice(num, 1, 0);
      },


      back(){
        this.$router.back();
      },

      getComment(id){
        api.getStoryExtraById(id).then( (res) => {
          this.commentNum = res.short_comments
        })
        api.getShortCommentsById(id).then( (res) => {
          // console.log(res)
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
      position: fixed;
      width: 100%;
      top: 0;
      background-color: #fff;
      border-bottom: 1px solid #e2e2e2;
      z-index: 10;
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
    .comments-content{
      margin-top: $height;
      padding-right: 15px;
      background-color: #fff;
      .content-list{
        padding: 15px 0px 15px 10px;
        display: flex;
        border-bottom: 1px solid #e2e2e2;
        &:last-child{
          border-bottom: 0px;
        }
      }
      .comment-pic{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 110%;
        }
      }
      .comment-comments{
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        width: 100%;
        .mask{
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: transparent;
        }
        .comment-author{
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;

          .author-name{
            font-size: 14px;
            font-weight: 600;
            color: black;
          }
          .iconfont.icon-htmal5icon26{
            padding: 5px 8px;
          }
          .comment-more{
            padding-right: 10px;
            .more-content{
              background-color: #fff;
              position: absolute;
              right: 0;
              width: 130px;
              z-index: 11;
              box-shadow: 0px 2px 4px #c5c5c5, -1px 0px 2px #c5c5c5;
              p{
                padding: 5px 10px;
                font-size: 14px;
              }
              p.active{
                background: #f1f1f1;
              }
            }
          }
        }
        .comment-content{
          padding-top: 8px;
          color: black;
        }
        .comment-time{
          padding-top: 15px;
          font-size: 10px;
          color: #a0a0a0;
        }
      }
    }
    .all-comment{
      padding-top: 10px;
      text-align: center;
      color: #a0a0a0;
      margin-bottom: 50px;
    }
    .comment-footer{
      height: 35px;
      display: flex;
      align-items: center;
      background-color: #f1f1f1;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      .your-pic{
        margin-left: 10px;
        border-radius: 50%;
        border: 2px solid #212020;
        background-color: #fff;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .your-comment{
        padding-left: 10px;
        width: 80%;
        input{
          outline: 0px;
          border: 0;
          background-color: transparent;
          font-size: 13px;
          width: 100%;
          display: inline-block;
        }
      }
    }
  }
</style>