<template>
  <v-container fluid>
    <navbar></navbar>
    <transition name="router" mode="out-in">
      <router-view class="view router-view"></router-view>
    </transition>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import router from "./router";
import Navbar from "./components/Navbar/Navbar.vue";

export default Vue.extend({
  name: "App",
  router,
  components: {
    Navbar
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
  height: 100%;
}

.max-height-row-mobile {
  height: calc(100% - 3rem);
}

.map-outter-style {
  padding: 0px !important;
}

.container {
  padding: 0px !important;
}
</style>
