# 技术路线：Vue2.0音乐webapp开发

1、页面ui（Element-UI + sass + vue-router）

Element-UI：是饿了么前端团队推出的一款基于Vue.js 2.0 的桌面端UI框架
sass3.0：CSS预处理器，是一种CSS的开发工具，提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发，变得简单和可维护。
Vue-router： vue-router进行路由跳转的处理。

2、接口调用（axios + mockjs）

Axios: axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端.
Mockjs：独立与后端开发，生成随机数据，拦截 Ajax 请求。

3、状态管理（vuex）

Vuex：vuex是一个专门为vue.js设计的集中式状态管理架构

4、自动化构建及其他工具
Vue-cli：Vue 脚手架工具，快速初始化项目代码
Webpack：webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
