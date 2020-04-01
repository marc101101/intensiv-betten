<template>
  <GmapMap
    :center="{ lat: 50.98, lng: 10.31 }"
    :zoom="7"
    style="width: 100%; height: 100%"
    :options="{
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: mapStyle
    }"
  >
    <gmap-cluster :calculator="clusterCalc" zoomOnClick>
      <GmapMarker
        :key="index"
        v-for="(m, index) in hospitals"
        :position="m.position"
        :icon="m.icon"
        :clickable="true"
        :options="{ icu: m.icu_high_care }"
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
    },
    clusterCalc(markers) {
      const count = markers.length;
      let index = 0; // 0 blue 1 yellow 2 red

      const yellowPercent =
        (markers.filter((x) => x.icu === "yellow").length / count) * 100;
      const redPercent =
        (markers.filter((x) => x.icu === "red").length / count) * 100;

      if (redPercent > 25) {
        index = 2;
      } else if (yellowPercent > 25) {
        index = 1;
      }

      return {
        text: count,
        index: index
      };
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
