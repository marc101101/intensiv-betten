<template>
  <div>
    <v-autocomplete
      v-model="select"
      :items="hospitals"
      :search-input.sync="search"
      @change="(e) => $store.commit('selectHospitals', [e])"
      @keydown="(e) =>checkSelection(e)"
      item-text="krankenhausStandort.bezeichnung"
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
    <!--v-btn
      @click="filterVisible = !filterVisible"
      rounded
      style="margin-top: 0.5rem;"
      class="white searchbar-font"
    >Filter</v-btn>
    <br />
    <filter-search v-if="filterVisible" />-->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { log } from "util";

export default Vue.extend({
  name: "SearchBar",
  components: {},
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      menuHidden: false,
      filterVisible: false
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
    },
    checkSelection(e) {
      if (!this.menuHidden) {
        if (e.key == "Enter") {
          const hospitals = this.hospitals.filter(element => {
            return element.krankenhausStandort.bezeichnung
              .toLowerCase()
              .includes(e.srcElement.value.toLowerCase());
          });
          this.$store.commit("selectHospitals", hospitals);
          document.getElementById("list-19")!.classList.add("hideMenu");
          this.menuHidden = true;
        }
      } else {
        document.getElementById("list-19")!.classList.remove("hideMenu");
        this.menuHidden = false;
      }
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
}

.v-list-item__title {
  font-family: canada-type-gibson, sans-serif !important;
  font-style: normal !important;
  margin-left: 0.5rem !important;
}

.hideMenu {
  display: none;
}

.white {
  background-color: white;
}
</style>
