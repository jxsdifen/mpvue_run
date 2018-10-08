import Vue from 'vue'
import Vuex from 'vuex'

// import pay from './modules/pay'
// import user from './modules/user'
// import search from './modules/search'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // user: {
    //   namespaced: true,
    //   ...user
    // },
    // pay: {
    //   namespaced: true,
    //   ...pay
    // },
    // search: {
    //   namespaced: true,
    //   ...search
    // }
  }
})

export default store