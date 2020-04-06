<template>
  <v-autocomplete
    v-model="select"
    :items="hospitals"
    :search-input.sync="search"
    @change="(e) => $store.commit('selectHospital', e)"
    item-text="hospital_short"
    :cache-items="true"
    class="searchbar searchbar-font"
    flat
    hide-no-data
    label="Deine Stadt"
    prepend-icon="mdi-magnify"
    solo
    return-object
    :menu-props="{ closeOnClick: true, closeOnContentClick: true }"
  ></v-autocomplete>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SearchBar",

  data() {
    return {
      loading: false,
      items: ["a", "b"],
      search: null,
      select: null
    };
  },
  watch: {
    search(val: string) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(v: string) {
      this.loading = true;
      this.items = this.items.filter((e: string) => {
        return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
      });
      this.loading = false;
    }
  },
  computed: {
    hospitals() {
      return this.$store.state.hospitals;
    }
  }
});
</script>
<style scoped>
.searchbar {
  height: 4rem;
  background: white;
  z-index: 99;
  padding: 0.5rem !important;
  padding-left: 1rem !important;
  box-shadow: 0px 12px 16px rgba(69, 91, 99, 0.08) !important;
}

.searchbar-font {
  font-family: canada-type-gibson, sans-serif;
  font-weight: 600;
  font-style: normal;
  margin-left: 0.5rem;
}

.v-list-item__title {
  font-family: canada-type-gibson, sans-serif !important;
  font-style: normal !important;
  margin-left: 0.5rem !important;
}
</style>
