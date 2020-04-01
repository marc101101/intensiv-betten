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
    <GmapMarker
      :key="index"
      v-for="(m, index) in hospitals"
      :position="m.position"
      :icon="m.icon"
      :clickable="true"
      :options="{ icu: m.icu_high_care }"
      @click="select(m)"
    />
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
            url: "/img/red.png",
            scaledSize: { height: 10, width: 10 }
          };

          return x;
        });
    }
  }
});
</script>
