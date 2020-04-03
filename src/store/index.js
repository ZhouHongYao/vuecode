import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView
  },
  state,
  getters,
  mutations,
  actions
})

export default store
