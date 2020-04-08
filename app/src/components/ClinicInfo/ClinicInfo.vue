<template>
  <v-card outlined v-if="selectedHospitals != []">
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
        >{{ selectedHospitals[index].krankenhausStandort.bezeichnung }}</v-list-item-title>
        <span
          class="uptime-time"
        >Letztes Update: {{selectedHospitals[index].meldezeitpunktReadable}}</span>

        <v-list-item-title>Aktuelle Situation</v-list-item-title>
        <hr />
        <v-btn
          class="black--text margin-right-btn"
          depressed
          color="white"
          @click="nextHospital()"
          dark
          absolute
          middle
          right
          fab
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-container fluid class="pa-0 ma-0">
          <v-col class="pl-0" v-if="selectedHospitals[index].bettenStatusColor.statusHighCare">
            <v-icon
              class="margin-right"
              v-if="selectedHospitals[index].bettenStatusColor.statusHighCare == 'red'"
              color="red"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[index].bettenStatusColor.statusHighCare == 'green'"
              color="green"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[index].bettenStatusColor.statusHighCare == 'grey'"
              color="grey"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[index].bettenStatusColor.statusHighCare == 'yellow'"
              color="yellow"
            >mdi-checkbox-blank-circle</v-icon>Betten mit inv. Beatmung
          </v-col>

          <v-col class="pl-0" v-if="selectedHospitals[index].bettenStatusColor.statusLowCare">
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[index].bettenStatusColor.statusLowCare == 'red'"
              color="red"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[index].bettenStatusColor.statusLowCare == 'green'"
              color="green"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[index].bettenStatusColor.statusLowCare == 'grey'"
              color="grey"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[index].bettenStatusColor.statusLowCare == 'yellow'"
              color="yellow"
            >mdi-checkbox-blank-circle</v-icon>Betten ohne inv. Beatmung
          </v-col>

          <v-col class="pl-0" v-if="selectedHospitals[index].bettenStatusColor.statusECMO">
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[index].bettenStatusColor.statusECMO == 'red'"
              color="red"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[index].bettenStatusColor.statusECMO == 'green'"
              color="green"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[index].bettenStatusColor.statusECMO == 'grey'"
              color="grey"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[index].bettenStatusColor.statusECMO== 'yellow'"
              color="yellow"
            >mdi-checkbox-blank-circle</v-icon>Zusätzliche Beatmung
          </v-col>
          <v-col
            class="pl-0"
            v-if="selectedHospitals[index].faelleCovidAktuell"
          >{{ selectedHospitals[index].faelleCovidAktuell }} Corona Fälle</v-col>
        </v-container>

        <v-list-item-title v-if="selectedHospitals[index].history.length != 0">Zeitlicher Verlauf</v-list-item-title>
        <hr />
        <div class="small" v-if="selectedHospitals[index].history.length != 0">
          <graph-view
            v-if="selectedHospitals[index].history.length != 0"
            :chart-data="historyDataCollection"
            :height="200"
          />
        </div>
      </v-list-item-content>
    </v-list-item>
    <div v-if="selectedHospitals.length > 1" class="text-center">
      <a v-for="(hospital, localIndex) in selectedHospitals" :key="hospital">
        <v-icon class="dots" v-if="index != localIndex" color="grey">mdi-checkbox-blank-circle</v-icon>
        <v-icon class="dots" v-if="index == localIndex" color="black">mdi-checkbox-blank-circle</v-icon>
      </a>
    </div>
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

  data: () => ({
    index: 0
  }),

  watch: {},
  computed: {
    selectedHospitals(): Array<{
      faelleCovidAktuell: number;
      meldezeitpunkt: string;
      history: { faelleCovidAktuell: number; meldezeitpunkt: string }[];
    }> {
      console.log(this.$store.state.selectHospitals[this.index]);

      return this.$store.state.selectHospitals;
    },
    historyDataCollection(): {
      labels: string[];
      datasets: { label: string; data: number[] }[];
    } {
      return this.generateDataRows();
    }
  },
  methods: {
    nextHospital() {
      console.log(this.index);
      console.log(this.selectedHospitals.length);
      if (this.index == this.selectedHospitals.length - 1) {
        this.index = 0;
      } else {
        this.index = this.index + 1;
      }
    },
    generateDataRows() {
      const dataArray: number[] = [];
      const labelArray: string[] = [];

      this.selectedHospitals[this.index].history.reverse().forEach(element => {
        dataArray.push(element.faelleCovidAktuell);
        labelArray.push(element.meldezeitpunkt.substring(0, 10));
      });

      dataArray.push(this.selectedHospitals[this.index].faelleCovidAktuell);
      labelArray.push(
        this.selectedHospitals[this.index].meldezeitpunkt.substring(0, 10)
      );

      return {
        labels: labelArray,
        datasets: [
          {
            label: "covid-19",
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

.margin-right-btn {
  margin-right: -2.8rem;
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
.dots {
  font-size: 10px;
}
</style>
