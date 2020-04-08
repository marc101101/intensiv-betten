import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

const state = {
  hospitals: [],
  selectHospitals: [],
  lastUpdate: "",
};

const mutations = {
  setLastUpdate(state, lastUpdate) {
    state.lastUpdated = lastUpdate;
  },
  setHospitals(state, hospitals) {
    state.hospitals = hospitals;
  },
  selectHospitals(state, selectedHospitals) {
    router
      .push({
        path: "",
        query: {
          kliniken: selectedHospitals.map((e) => {
            return e.id;
          }),
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((err) => {});
    state.selectHospitals = selectedHospitals;
  },
  unselectHospital(state) {
    router
      .push({ path: "", query: {} })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((err) => {});
    state.selectedHospitals = [];
  },
};

const actions = {
  async loadHospitals({ commit }: { commit: Function }) {
    const { data } = await Vue.axios.get("/aggregated_v2.json");

    await commit("setHospitals", data.data);
    await commit("setLastUpdate", data.last_update);
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
