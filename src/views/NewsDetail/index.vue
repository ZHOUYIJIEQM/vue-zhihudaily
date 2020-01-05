<template>
  <div class="news-detail">
    <link rel="stylesheet" :href="story.css"/>
    <div class="container">
      <div class="top" v-if="story.image">
        <img :src="imgPath+story.image" class="img"/>
        <div class="mask"></div>
        <div class="info">
          <div class="title">{{story.title}}</div>
          <div class="image_source">{{story.image_source}}</div>
        </div>
      </div>
      <div v-if="story.body">
        <div v-html="storyBody" class="my-body"></div>
      </div>
      <div v-else-if="!story" class="no-content">没有内容</div>
    </div>
    <div class="share-mask" @click="toShare" v-show="shareModuleIsShow"></div>
    <transition name="fadeIn">
      <div class="share-position" v-show="shareModuleIsShow">
        <shareModule @toggleShare="toShare"></shareModule>
      </div>
    </transition>
    
    <div class="bottombar">
      <bottomBar 
        :commentInfo="storyExtra"
        @toComment="toComment"
        @toShare="toShare"
      ></bottomBar>
    </div>
  </div>
</template>
<script>
  import api from '@/api'
  import port from '@/api/proxyPort'

  export default {
    components: {
      bottomBar: () => import('@/components/BottomBar'),
      shareModule: () => import('@/components/ShareModule'),
    },
    data(){
      return {
        story: {},
        storyBody: '',
        isFirstEnter: false,
        shareModuleIsShow: false,
        imgPath: port.imgPath,
        storyExtra: {},
      }
    },
    created(){
      this.isFirstEnter = true;
    },
    activated(){
      if(!this.$route.meta.isBack || this.isFirstEnter){
        // console.log('进入')
        this.getPost(this.$route.params.id);
        this.isFirstEnter = false;
      }
    },
    deactivated(){
      // console.log('切换')
    },
    beforeRouteEnter(to, from, next){
      if(from.name === 'homePage'){
        to.meta.isBack = false;
      }else if(from.name === 'comment'){
        to.meta.isBack = true;
      }
      next();
    },
    methods: {
      // ...mapActions(['']) 不用写到actions了，太麻烦
      
      getPost(id){
        api.getPost(id).then((res) => {
          // console.log(JSON.stringify(res, null, '  '))
          this.story = res;
          this.storyBody = this.handlerimg(res.body)
          // this.storyBody = res.body;
          // console.log(this.storyBody);
          this.getExtra(id);
        })
      },

      getExtra(id){
        api.getStoryExtraById(id).then( res => {
          // console.log(JSON.stringify(res, null, '  '))
          this.storyExtra = res;
        })
      },

      handlerimg(str){
        var reg = new RegExp("src=\"http(s{0,1})\:\/\/pic", "g")
        return str.replace(reg, `src="${port.imgPath}http://pic`);
      },

      toShare(){
        this.shareModuleIsShow = !this.shareModuleIsShow;
      },

      toComment(){
        this.$router.push({
          name: 'comment',
          params: {
            id: this.story.id
          }
        })
      },

    },
  }
</script>

<style lang="scss">
  @import '@/styles/newsDetail.scss';
</style>

<style lang="scss" scoped>
  .news-detail{
    .no-content{
      font-size: 35px;
      font-weight: 600;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      color: #0e84b1;
      z-index: 100;
    }
    .container{
      .top{
        height: 272px;
        position: relative;
        overflow: hidden;
        img{
          width: 100%;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%) scale(1.1);
        }
        .mask{
            position: absolute;
            left: 0;
            top: 0; 
            bottom: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 15%, rgba(0, 0, 0, 0.5) 25%, rgba(0, 0, 0, 0.14) 100%);

          }
        .info{
          position: absolute;
          width: 100%;
          color: white;
          bottom: 10px;
          .title{
            font-size: 16.5px;
            font-weight: 600;
            padding: 0 10px;
            margin-bottom: 8px;
          }
          .image_source{
            text-align: right;
            padding-right: 8px;
            color: #cecece;
            font-size: 8px;
          }
        }
      }
    }
    .share-mask{
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 10;
    }
    .share-position{
      position: fixed;
      width: 100%;
      border-radius: 10px 10px 0 0;
      bottom: 0;
      overflow: hidden;
      z-index: 10;
    }
  }

  .fadeIn-enter-active {
    animation: fadeInUp .5s;
  }
  .fadeIn-leave-active {
    animation: fadeInUp .5s reverse;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0.8;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

</style>