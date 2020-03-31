<template>
  <GmapMap
    :center="{ lat: 49.0134297, lng: 12.1016236 }"
    :zoom="12"
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
    />
  </GmapMap>
</template>

<script lang="ts">
import Vue from "vue";

import mapStyle from "./mapStyle";

export default Vue.extend({
  name: "HospitalMap",

  data: () => ({
    mapStyle,
    hospitals: [
      {
        position: { lat: 49, lng: 12 },
        icon: {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        }
      }
    ]
  })
});
</script>
