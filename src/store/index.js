import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    breadcrumbs: [],
    dataMember: {},
    form_payment: [],
    detail_payment: [],
    payment_success: [],
    admin: [],
    round: []
  },
  mutations: {
    SET_BREADCRUMBS (state, payload) {
      state.breadcrumbs = payload
    },
    SET_DATA_MEMBER (state, payload) {
      state.dataMember = payload
    },
    SET_FORM_PAYMENT (state, payload) {
      state.form_payment = payload
    },
    SET_PAYMENT_SUCCESS (state, payload) {
      state.payment_success = payload
    },
    SET_DETAIL_PAYMENT (state, payload) {
      state.detail_payment = payload
    },
    SET_ROUND (state, payload) {
      state.round = payload
    },
    SET_ADMIN (state, adminData) {
      state.admin = adminData
    }
  },
  actions: {
    actionSetBreadcrumbs (context, payload) {
      context.commit('SET_BREADCRUMBS', payload)
    },
    actionSetDataMember (context, payload) {
      context.commit('SET_DATA_MEMBER', payload)
    },
    actionSetFormPayment (context, payload) {
      context.commit('SET_FORM_PAYMENT', payload)
    },
    actionSetPaymentSuccess (context, payload) {
      context.commit('SET_PAYMENT_SUCCESS', payload)
    },
    actionSetDetailPayment (context, payload) {
      context.commit('SET_DETAIL_PAYMENT', payload)
    },
    actionSetRound (context, payload) {
      context.commit('SET_ROUND', payload)
    },
    setAdminData (context, payload) {
      context.commit('SET_ADMIN', payload)
    }
  },
  getters: {
    getterBreadcrumbs (state) {
      return state.breadcrumbs
    },
    getterDataMember (state) {
      return state.dataMember
    },
    getterFormPayment (state) {
      return state.form_payment
    },
    getterPaymentSuccess (state) {
      return state.payment_success
    },
    getterDetailPayment (state) {
      return state.detail_payment
    },
    getterRound (state) {
      return state.round
    },
    getAdmin (state) {
      return state.admin
    }
  }
})
