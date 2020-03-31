<template>
  <GmapMap
    :center="{ lat: 49.0134297, lng: 12.1016236 }"
    :zoom="8"
    style="width: 100%; height: 100%"
    :options="{
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: mapStyle
    }"
  >
    <gmap-cluster>
      <GmapMarker
        :key="index"
        v-for="(m, index) in hospitals"
        :position="m.position"
        :icon="m.icon"
        :clickable="true"
        @click="select(m)"
      />
    </gmap-cluster>
  </GmapMap>
</template>

<script lang="ts">
import Vue from "vue";
import mapStyle from "./mapStyle";

function getFillColor(hospital) {
  if (hospital.icu_high_care === "green") {
    return "green";
  } else if (hospital.icu_high_care === "yellow") {
    return "yellow";
  } else if (hospital.icu_high_care === "red") {
    return "red";
  }
}

export default Vue.extend({
  name: "HospitalMap",

  data: () => ({
    mapStyle,
    selected: null
  }),

  methods: {
    select(hospital) {
      this.selected = hospital;
    }
  },

  computed: {
    hospitals() {
      const hospitals = this.$store.state.hospitals;
      return hospitals
        .filter((x) => x.lat && x.lon)
        .map((x) => {
          x.position = { lat: x.lat, lng: x.lon };

          x.icon = {
            path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
            fillColor: getFillColor(x),
            fillOpacity: 0.6,
            strokeWeight: 0,
            scale: 1
          };

          return x;
        });
    }
  }
});
</script>
