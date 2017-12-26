// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/assets/scss/index.scss'
import VueLazyload from 'vue-lazyload'

// 图片懒加载

Vue.use(VueLazyload, {
  loading: require('@/assets/img/default.png')// 没有加载出来的图片
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
