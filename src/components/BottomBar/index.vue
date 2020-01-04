<template>
  <div class="header">
    <div class="goback" @click="back">
      <span class="iconfont icon-fanhui"></span>
    </div>
    <div class="icon">
      <div class="comment" @click="$emit('toComment')">
        <span class="iconfont icon-xiaoxi"></span>
        <span class="num" v-if="">{{commentInfo.short_comments|number}}</span>
      </div>
      <div class="support" @click="supportPost">
        <span class="iconfont icon-good"></span>
        <span class="num">{{commentInfo.popularity|number}}</span>
      </div>
      <div class="collect" @click="toCollect">
        <span class="iconfont icon-shoucangxing"></span>
      </div>
      <div class="share" @click="$emit('toShare')">
        <span class="iconfont icon-fenxiang"></span>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    props: {
      commentInfo: Object,
    },
    filters:{
      number(num){
        if(num>=1000){
          return (num/1000).toFixed(1) + 'k';
        }else{
          return num;
        }
      }
    },
    methods: {
      back(){
        this.$router.back();
      },

      supportPost(){
        this.$toast({
          message: '点赞需要登录！',
          iconClass: 'iconfont icon-zhihu',
          duration: 2000
        })
      },

      toCollect(){
        this.$toast({
          message: '收藏需要登录！',
          iconClass: 'iconfont icon-zhihu',
          duration: 2000
        })
      },

    }
  }
</script>
<style lang="scss" scoped>
  .header{
    display: flex;
    align-items: center;
    height: 40px;
    background-color: #f3f3f3;

    .iconfont{
      font-weight: 600;
    }

    div{
      display: flex;
      align-items: center;
      
    }

    .goback{
      justify-content: center;
      width: 14%;
      padding: 3px 0;
      border-right: 1px solid #838383;
    }

    .icon{
      width: 86%;
      justify-content: space-around;

      div{
        position: relative;
        span.num{
          position: relative;
          top: -3px;
          padding-left: 3px;
          font-size: 8px;
        }
      }

      .iconfont{
        font-size: 20px;
      }
    }
  }
</style>