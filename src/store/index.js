import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: [],
    paymentsListIds: [],
    dataLoaded: false,
    categoriesLoaded: false,
  },
  getters: {
    getPaymentsList: (state) => state.paymentsList,
    getCategoryList: (state) => state.categoryList,
    getFullPaymentValue: (state) => {
      return state.paymentsList.reduce((res, cur) => res + cur.value, 0);
    },
    getDataLoaded: (state) => state.dataLoaded,
    getCategoriesLoaded: (state) => state.categoriesLoaded,
  },
  mutations: {
    setDataLoaded(state, payload) {
      state.dataLoaded = payload;
    },
    setCategoriesLoaded(state, payload) {
      state.categoriesLoaded = payload;
    },
    setPaymentsListData(state, payload) {
      state.paymentsList = payload;
    },
    setCategories(state, payload) {
      state.categoryList = payload;
    },
    addDataToPaymentsList(state, payload) {
      state.paymentsList.push(payload);
    },
    addDataToCategoryList(state, payload) {
      state.categoryList.push(payload);
    },
  },

  actions: {
    fetchData({ state, commit }) {
      if (state.dataLoaded) {
        return;
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              date: "28.03.2020",
              category: "Food",
              value: 169,
            },
            {
              date: "24.03.2020",
              category: "Transport",
              value: 360,
            },
            {
              date: "24.03.2020",
              category: "Food",
              value: 532,
            },
          ]);
        }, 1000);
      }).then((res) => {
        commit("setPaymentsListData", res);
        commit("setDataLoaded", true);
      });
    },
    fetchCategoryList({ state, commit }) {
      if (state.categoriesLoaded) {
        return;
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(["Food", "Transport", "Education", "Entertainment"]);
        }, 1000);
      }).then((res) => {
        commit("setCategories", res);
        commit("setCategoriesLoaded", true);
      });
    },
  },
  modules: {},
});
