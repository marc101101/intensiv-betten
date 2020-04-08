<template>
  <v-app style="margin-top:-48px">
    <v-content>
      <v-row
        class="max-height-row"
        v-if="
          $vuetify.breakpoint.lg ||
            $vuetify.breakpoint.md ||
            $vuetify.breakpoint.xl
        "
      >
        <v-col lg="12" class="map-outter-style">
          <search-bar class="desktop" />
          <clinic-info class="desktop desktop-extended" />
          <hospital-map />
        </v-col>
      </v-row>

      <v-row
        class="max-height-row-mobile"
        style="overflow:hidden"
        v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
      >
        <v-col cols="12" class="map-outter-style">
          <search-bar class="mobile" />
          <clinic-info class="mobile mobile-extended" />
        </v-col>
        <hospital-map />
      </v-row>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HospitalMap from "../components/HospitalMap/HospitalMap.vue";
import SearchBar from "../components/SearchBar/SearchBar.vue";
import ClinicInfo from "../components/ClinicInfo/ClinicInfo.vue";

export default Vue.extend({
  name: "Home",
  components: {
    HospitalMap,
    SearchBar,
    ClinicInfo
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
  height: 100%;
}

.max-height-row-mobile {
  height: 100%;
  margin-right: 0px !important;
  margin-left: 0px !important;
}

.map-outter-style {
  padding: 0px !important;
}

.desktop {
  margin-left: 2.1rem !important;
  width: 30rem;
  position: absolute;
  z-index: 99;
  margin-top: 4rem !important;
}

.desktop-extended {
  margin-left: 2.1rem !important;
  margin-top: 11.5rem !important;
}

.mobile {
  margin-left: 2.1rem !important;
  position: absolute;
  z-index: 99;
  margin-top: 4rem !important;
  min-width: 20rem;
  max-width: 30rem;
}

.mobile-extended {
  margin-left: 0rem !important;
  margin-right: 0rem !important;
  margin-top: 150% !important;
  width: 100%;
}
</style>
