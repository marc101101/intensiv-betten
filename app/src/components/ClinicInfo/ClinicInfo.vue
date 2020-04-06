<template>
  <v-card outlined v-if="selectedHospital">
    <v-btn
      @click="(e) => $store.commit('unselectHospital')"
      class="black--text"
      depressed
      color="white"
      dark
      absolute
      top
      right
      fab
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title
          class="headline mb-1"
        >{{ selectedHospital.krankenhausStandort.bezeichnung }}</v-list-item-title>
        <span class="uptime-time">Letztes Update: {{selectedHospital.meldezeitpunktReadable}}</span>

        <v-list-item-title>Aktuelle Situation</v-list-item-title>
        <hr />
        <v-container fluid class="pa-0 ma-0">
          <v-col class="pl-0" v-if="selectedHospital.bettenStatusColor.statusHighCare">
            <v-icon
              class="margin-right"
              v-if="selectedHospital.bettenStatusColor.statusHighCare == 'red'"
              color="red"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospital.bettenStatusColor.statusHighCare == 'green'"
              color="green"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospital.bettenStatusColor.statusHighCare == 'grey'"
              color="grey"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospital.bettenStatusColor.statusHighCare == 'yellow'"
              color="yellow"
            >mdi-checkbox-blank-circle</v-icon>Betten mit inv. Beatmung
          </v-col>

          <v-col class="pl-0" v-if="selectedHospital.bettenStatusColor.statusLowCare">
            <v-icon
              class="icon-margin"
              v-if="selectedHospital.bettenStatusColor.statusLowCare == 'red'"
              color="red"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospital.bettenStatusColor.statusLowCare == 'green'"
              color="green"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospital.bettenStatusColor.statusLowCare == 'grey'"
              color="grey"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospital.bettenStatusColor.statusLowCare == 'yellow'"
              color="yellow"
            >mdi-checkbox-blank-circle</v-icon>Betten ohne inv. Beatmung
          </v-col>

          <v-col class="pl-0" v-if="selectedHospital.bettenStatusColor.statusECMO">
            <v-icon
              class="icon-margin"
              v-if="selectedHospital.bettenStatusColor.statusECMO == 'red'"
              color="red"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospital.bettenStatusColor.statusECMO == 'green'"
              color="green"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospital.bettenStatusColor.statusECMO == 'grey'"
              color="grey"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospital.bettenStatusColor.statusECMO== 'yellow'"
              color="yellow"
            >mdi-checkbox-blank-circle</v-icon>Zusätzliche Beatmung
          </v-col>
          <v-col
            class="pl-0"
            v-if="selectedHospital.faelleCovidAktuell"
          >{{ selectedHospital.faelleCovidAktuell }} Corona Fälle</v-col>
        </v-container>

        <v-list-item-title v-if="selectedHospital.history.length != 0">Zeitlicher Verlauf</v-list-item-title>
        <hr />
        <div class="small" v-if="selectedHospital.history.length != 0">
          <graph-view
            v-if="selectedHospital.history.length != 0"
            :chart-data="historyDataCollection"
            :height="200"
          />
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import GraphView from "../GraphView/GraphView.vue";

export default Vue.extend({
  name: "ClinicInfo",

  components: {
    GraphView
  },
  data: () => ({}),

  watch: {},
  computed: {
    selectedHospital(): { history: { covid: number; date: string }[] } {
      return this.$store.state.selectedHospital;
    },
    historyDataCollection(): {
      labels: string[];
      datasets: { label: string; data: number[] }[];
    } {
      return this.generateDataRows();
    }
  },
  methods: {
    generateDataRows() {
      const dataArray: number[] = [];
      const labelArray: string[] = [];
      this.selectedHospital.history.reverse().forEach(element => {
        dataArray.push(element.covid);
        labelArray.push(element.date.substring(0, 10));
      });

      return {
        labels: labelArray,
        datasets: [
          {
            label: "Covid-19",
            data: dataArray
          }
        ]
      };
    }
  }
});
</script>
<style scoped>
.headline {
  white-space: normal;
  font-family: canada-type-gibson, sans-serif;
  font-weight: 600;
  font-style: normal;
  margin-top: 1rem;
}

.margin-right {
  margin-right: 1rem;
}

.small {
  width: 100%;
  margin-top: 1rem;
}

.v-card {
  z-index: 99;
  font-family: canada-type-gibson, sans-serif;
  font-style: normal;
}

.theme--light.v-card.v-card--outlined {
  border: 0 !important;
}

.close-button {
  float: right;
  padding: 0.5rem;
}

.icon-margin {
  margin-right: 1rem;
}

.uptime-time {
  color: grey;
  font-size: 0.8rem;
  padding: 0.5rem;
  padding-left: 0;
}
</style>
