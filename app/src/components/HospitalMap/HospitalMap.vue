<template >
  <GmapMap
    v-if="hospitals"
    :center="center"
    :zoom="zoom"
    style="position: initial; height:100%"
    :options="{
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: mapStyle
    }"
  >
    <GmapCircle
      v-for="(m, index) in hospitals"
      :key="index"
      :center="m.position"
      :radius="getRadius(m.faelleCovidAktuell)"
      :visible="true"
      :options="{fillColor: m.bettenStatusColor.statusHighCare, strokeWeight:0.3 }"
      @click="select(m)"
    ></GmapCircle>
  </GmapMap>
</template>

<script lang="ts">
import Vue from "vue";
import mapStyle from "./mapStyle";
import { orderBy } from "lodash";

export default Vue.extend({
  name: "HospitalMap",

  data: () => ({
    mapStyle,
    center: { lat: 50.98, lng: 10.31 },
    zoom: 7,
    shared: false
  }),

  updated() {
    this.checkCurrentRoute();
  },

  methods: {
    checkCurrentRoute() {
      let givenHospital = this.$route.query.kliniken;

      console.log(givenHospital);

      if (!givenHospital) {
        givenHospital = [];
      }

      if (givenHospital.length != 0) {
        const result = this.hospitals.filter(
          hospital => hospital.id == givenHospital[0]
        );
        console.log(result);

        this.select(result);
      }
    },
    select(hospital) {
      this.$store.commit("selectHospitals", [hospital]);
    },
    getRadius(covid) {
      if (covid) {
        return 1000 + covid * 500;
      }
      return 1000;
    },
    mapStringToColor(status) {
      if (status == null) {
        return "grey";
      }
      if (status == "VERFUEGBAR") {
        return "green";
      }
      if (status == "NICHT_VERFUEGBAR") {
        return "red";
      }
      if (status == "BEGRENZT") {
        return "yellow";
      }
    }
  },

  watch: {
    selectedHospitals() {
      if (!this.selectedHospitals) {
        return;
      }
      this.center = {
        lat: this.selectedHospitals[0].position.lat,
        lng: this.selectedHospitals[0].position.lng
      };

      this.zoom = 13;
    }
  },

  computed: {
    selectedHospitals() {
      return this.$store.state.selectHospitals;
    },
    hospitals() {
      const hospitals = this.$store.state.hospitals;

      const result = hospitals
        .filter(
          x =>
            x.krankenhausStandort.position.latitude &&
            x.krankenhausStandort.position.longitude
        )
        .map(x => {
          x.position = {
            lat: x.krankenhausStandort.position.latitude,
            lng: x.krankenhausStandort.position.longitude
          };
          x.faelleCovidAktuell =
            x.faelleCovidAktuell != null ? x.faelleCovidAktuell : 0;
          x.bettenStatusColor = {
            statusLowCare: this.mapStringToColor(x.bettenStatus.statusLowCare),
            statusHighCare: this.mapStringToColor(x.bettenStatus.statusLowCare),
            statusECMO: this.mapStringToColor(x.bettenStatus.statusLowCare)
          };
          x.meldezeitpunktReadable = x.meldezeitpunkt;
          return x;
        });
      return orderBy(result, "faelleCovidAktuell", "desc");
    }
  }
});
</script>
