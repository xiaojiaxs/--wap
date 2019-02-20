// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


Vue.config.productionTip = false

//后台接口
import netif from './interface/interface.js'
Vue.prototype.netif = netif

//自定义指令，表单聚焦
Vue.directive("focus",{
	inserted:function(el){
		el.focus()
	}
})

//网络数据下载
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)

//jQuery
import $ from 'jquery'

//mint-ui
import 'mint-ui/lib/style.css'
import { Switch } from 'mint-ui';
Vue.component(Switch.name, Switch);

//注册全局组件
import navbar from '@/components/common/navbar'
import tabbar from '@/components/common/tabbar'
import toolbar from '@/components/common/toolbar'
import comments from '@/components/common/comments'
import commentsList from '@/components/common/commentsList'
import share from '@/components/common/share'

const loadComponent = {
	install(Vue){
		Vue.component("navbar",navbar)
		Vue.component("tabbar",tabbar)
		Vue.component("toolbar",toolbar)
		Vue.component("comments",comments)
		Vue.component("share",share)
		Vue.component("commentsList",commentsList)
	}
}
Vue.use(loadComponent)

//阅读详情，音乐详情  base64解码
let Base64 = require('js-base64').Base64;

//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
//  error:'./src/assets/img/error.png',  
    loading:'./static/loading.gif',
    preLoad: 1.3,
    attempt:3
})


//加载保存的主题名
Vue.prototype.turn = false
if(localStorage.turn != undefined){
	Vue.prototype.turn = localStorage.turn
}
Vue.prototype.themeName = "light"
if(localStorage.themeName != undefined){
	Vue.prototype.themeName = localStorage.themeName
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
