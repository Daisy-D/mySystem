import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import routers from './router.js'
import iView from 'iview';
import loadingView from './js/loadingView.js';
import store from './store/store.js'
import 'iview/dist/styles/iview.css';
import './styles/iviewTheme.less';
// import echarts from 'echarts';
// import 'echarts-wordcloud';
// Vue.prototype.$echarts = echarts;

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(loadingView);

let router = new VueRouter({
    mode: 'hash',
    routes: routers
})

window.WebSiteApp = new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: {
        App
    }
})