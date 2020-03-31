<template>
  <v-app>
    <v-content>
      <hospital-map />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HospitalMap from "./components/HospitalMap/HospitalMap.vue";

export default Vue.extend({
  name: "App",

  components: {
    HospitalMap
  },

  data: () => ({}),

  mounted() {
    this.$store.dispatch("loadHospitals");
  }
});
</script>
