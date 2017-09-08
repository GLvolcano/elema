<template>
  <div id="app">
    <header-item :seller="seller"></header-item>
    <div class="tab">
      <ul class="tab-list">
        <li class="tab-item">
          <router-link :to="'home'">商品</router-link>
        </li>
        <li class='tab-item'>
          <router-link :to="'appraise'">评价</router-link>
        </li>
        <li class='tab-item'>
          <router-link :to="'merchant'">商家</router-link>
        </li>
      </ul>
    </div>
    <transition name="fade" mode="out-in">
      <router-view :seller="seller"></router-view>
    </transition>

  </div>
</template>

<script type='text/ecmascript-6'>
import header from './components/header/header';
const ERR_OK = 0;
export default {
  components: {
    'header-item': header
  },
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get('/api/seller').then((respont) => {
      let res = respont.data;
      if (res.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, res.data);
      }
    });
  }
};
</script>

<style lang='less'>
@import './assets/common/css/mixin';
.tab {
  height: 40px;
  line-height: 40px;
  text-align: center;
  .border-1px(top, rgba(7, 17, 27, 0.1));
  .tab-list {
    display: flex;
    .tab-item {
      flex: 1;
      a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
      }
      .active {
        color: rgb(240, 20, 20);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
