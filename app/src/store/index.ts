import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  hospitals: [],
  lastUpdate: ""
};

const mutations = {
  setLastUpdate(state, lastUpdate) {
    state.lastUpdated = lastUpdate;
  },
  setHospitals(state, hospitals) {
    state.hospitals = hospitals;
  }
};

const actions = {
  async loadHospitals({ commit }: { commit: Function }) {
    const { data } = await Vue.axios.get("/aggregated.json");

    await commit("setHospitals", data.data);
    await commit("setLastUpdate", data.last_update);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
