import Vue from 'vue'
import App from './App'
import store from './store'

// 将fly实例挂在vue原型上，在然而你和组件中通过this使用fly
// var Fly=require("flyio/dist/npm/wx") 
// var fly=new Fly

Vue.config.productionTip = false;
App.mpType = 'app'

Vue.prototype.$store = store;

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/logs/main',
      '^pages/index/main',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '跑步',
      navigationBarTextStyle: 'black'
    }
    ,
    tabBar: {
      color: '#211614',
      selectedColor: '#EE542E',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/index/main',
        text: '查询',
        // iconPath: 'static/images/icon-home.png',
        // selectedIconPath: 'static/images/icon-home-active.png',
      }, {
        pagePath: 'pages/index/main',
        text: '订单',
        // iconPath: 'static/images/icon-order.png',
        // selectedIconPath: 'static/images/icon-order-active.png',
      }, {
        pagePath: 'pages/index/main',
        text: '我的',
        // iconPath: 'static/images/icon-my.png',
        // selectedIconPath: 'static/images/icon-my-active.png'
      }]
    }
  }
}