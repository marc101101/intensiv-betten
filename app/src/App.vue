<template>
  <v-app>
    <v-content>
      <v-card class="toolbar">
        <v-toolbar dense>
          <img class="toolbar-logo" src="./assets/logo.png" />
          <v-toolbar-title class="toolbar-title">
            <span class="toolbar-title-regular">Intensiv</span>
            <span class="toolbar-title-red">Betten</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <!--v-app-bar-nav-icon></v-app-bar-nav-icon-->
        </v-toolbar>
      </v-card>
      <v-row class="max-height-row" v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md">
        <v-col lg="3">
          <search-bar />
        </v-col>
        <v-col lg="9" class="map-outter-style">
          <hospital-map />
        </v-col>
      </v-row>
      <v-row
        class="max-height-row-mobile"
        style="overflow:hidden"
        v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
      >
        <v-col cols="12">
          <search-bar />
        </v-col>
        <hospital-map />
      </v-row>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HospitalMap from "./components/HospitalMap/HospitalMap.vue";
import SearchBar from "./components/SearchBar/SearchBar.vue";
import ClinicInfo from "./components/ClinicInfo/ClinicInfo.vue";

export default Vue.extend({
  name: "App",

  components: {
    HospitalMap,
    SearchBar,
    ClinicInfo
  },

  data: () => ({}),

  mounted() {
    this.$store.dispatch("loadHospitals");
  }
});
</script>

<style>
.toolbar {
  z-index: 99;
}
.toolbar-logo {
  height: 70%;
}
.toolbar-title {
  font-family: canada-type-gibson, sans-serif;
  font-weight: 600;
  font-style: normal;
  margin-left: 0.5rem;
}

.toolbar-title-regular {
  color: #78849e;
}

.toolbar-title-red {
  color: #eb413d;
}

.max-height-row {
  height: calc(100% - 48px);
}

.max-height-row-mobile {
  height: calc(100% - 3rem);
}

.map-outter-style {
  padding: 0px !important;
}
</style>
