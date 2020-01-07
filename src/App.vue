<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 左右移动加载动画 -->
    <div class="loading" v-show="refreshing">
      <span class="left"></span>
      <span class="middle"></span>
      <span class="right"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    refreshing(){
      return this.$store.state.refreshing;
    }
  },
  updated(){
    console.log('app updated', this.refreshing)
  }
}
</script>

<style lang="scss" scoped>
$yellow: #FFD300;
$blue: #5B7492;
$gray: #acb9c8;

.loading {
  z-index: 101;
  width: 25%;
  height: 0.65rem;
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);

  span {
    display: block;
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    position: absolute;
    background: $blue;
    transform: translate(-50%, 0);
  }

  .left {
    background: $yellow;
    animation: lMove 2.5s ease infinite;
  }

  .middle {
    left: 50%;
    animation: mMove 2.5s ease infinite;
  }

  .right {
    left: 100%;
    background: $gray;
    animation: rMove 2.5s ease infinite;
  }
}

@keyframes lMove {
  0% {
    left: 0;
  }

  25% {
    left: 50%;
    background: $yellow;
  }

  50% {
    left: 100%;
    background: $blue;
  }

  75% {
    left: 50%;
    background: $gray;
  }

  100% {
    left: 0;
  }
}

@keyframes mMove {
  0% {}

  25% {
    background: $blue;
  }

  50% {
    background: $yellow;
  }

  75% {
    background: $blue;
  }

  100% {}
}

@keyframes rMove {
  0% {
    left: 100%;
  }

  25% {
    left: 50%;
  }

  50% {
    left: 0;
    background: $gray;
  }

  75% {
    left: 50%;
    background: $yellow;
  }

  100% {
    left: 100%;
  }
}
</style>
