import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = new Vuex.Store({
    state: {
        userInfo: {},
        serverInfo:{},
        isLoadingShow:false
    }
    // ,
    // mutations: {
    // }
})
export default state