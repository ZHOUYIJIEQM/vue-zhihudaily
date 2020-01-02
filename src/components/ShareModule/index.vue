<template>
  <div class="share-module" >
    <div class="share-content">
      <div class="share-item"
        v-for="(item, index) in shareItems"
        :key="index"
        @click="doSomething(item.do)"
      >
        <div :class="item.icon"></div>
        <div class="itemContent">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

    data(){
      return {
        shareItems: [
          {
            name: '微信好友',
            do: 'wechat',
            icon: 'iconfont icon-weixin'
          },
          {
            name: '朋友圈',
            do: 'friendCircle',
            icon: 'iconfont icon-pengyouquan'
          },
          {
            name: 'QQ',
            do: 'qq',
            icon: 'iconfont icon-QQ'
          },
          {
            name: '复制链接',
            do: 'copyLink',
            icon: 'iconfont icon-lianjie-tianchong'
          },
          {
            name: '浏览器打开',
            do: 'openBrowser',
            icon: 'iconfont icon-anzhuoduanliulanqidakai'
          },
          {
            name: '更多',
            do: 'more',
            icon: 'iconfont icon-iconfontgengduo'
          },
        ]
      };
    },
    methods: {
      doSomething(doThis){
        this[doThis]();
      },
      // 分享给微信好友
      wechat(){
        console.log('wechat');
        this.sendToggleShare();
      },
      // 分享微信朋友圈
      friendCircle(){
        console.log('friendCircle')
        this.sendToggleShare();
      },
      // 分享到qq
      qq(){
        console.log('qq')
        this.sendToggleShare();
      },
      // 复制链接
      copyLink(){
        this.copyTips();
        console.log('copyLink', location.href)
        this.sendToggleShare();
      },
      // 浏览器打开
      openBrowser(){
        console.log('openBrowser')
        this.sendToggleShare();
      },
      more(){
        console.log('more');
        this.$toast({
          message: '查看更多！',
          iconClass: 'iconfont icon-zhihu',
          duration: 1000
        });
        this.sendToggleShare();
      },
      sendToggleShare(){
        // console.log('emit')
        this.$emit('toggleShare');
      },


      copyTips(){
        // 获取要复制的链接地址
        let copyStr = location.href;
        // 创建一个input并加到body里，把要复制的值放到它的value
        let oInput = document.createElement('input');
        oInput.value = copyStr;
        document.body.appendChild(oInput);
        // 选取input的内容
        oInput.select();
        // 执行复制命令
        let copyResult = document.execCommand('copy');
        // 移除添加进去的input
        document.body.removeChild(oInput);
        if(copyResult){
          this.$toast({
            message: '已复制到剪切板！',
            iconClass: 'iconfont icon-zhihu',
            duration: 1000
          });
        }else{
          this.$toast({
            message: '复制失败！',
            iconClass: 'iconfont icon-zhihu',
            duration: 1000
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .share-module{
    background-color: white;
    .share-content{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding-bottom: 15px;
      
      .share-item{
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 15px;

        .iconfont{
          font-size: 32px;
          color: #4e4a4a;
        }
        .itemContent{
          color: #4e4a4a;
          font-size: 12px;
          font-weight: 500;
          padding-top: 5px;
        }
      }

    }
  }
</style>