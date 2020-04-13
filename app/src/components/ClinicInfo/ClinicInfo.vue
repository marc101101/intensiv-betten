<template>
  <v-card outlined v-if="selectedHospitals">
    <v-btn
      @click="(e) => $store.commit('unselectHospitals')"
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
        >{{ selectedHospitals[currentObject].krankenhausStandort.bezeichnung }}</v-list-item-title>
        <span
          class="uptime-time"
        >Letztes Update: {{selectedHospitals[currentObject].meldezeitpunktReadable}}</span>

        <v-list-item-title>Aktuelle Situation</v-list-item-title>
        <hr />
        <v-btn
          v-if="selectedHospitals.length > 1"
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
          <v-col
            class="pl-0"
            v-if="selectedHospitals[currentObject].bettenStatusColor.statusHighCare"
          >
            <v-icon
              class="margin-right"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusHighCare == 'red'"
              color="red"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusHighCare == 'green'"
              color="green"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusHighCare == 'grey'"
              color="grey"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusHighCare == 'yellow'"
              color="yellow"
            >mdi-checkbox-blank-circle</v-icon>Betten mit inv. Beatmung
          </v-col>

          <v-col
            class="pl-0"
            v-if="selectedHospitals[currentObject].bettenStatusColor.statusLowCare"
          >
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusLowCare == 'red'"
              color="red"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusLowCare == 'green'"
              color="green"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusLowCare == 'grey'"
              color="grey"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusLowCare == 'yellow'"
              color="yellow"
            >mdi-checkbox-blank-circle</v-icon>Betten ohne inv. Beatmung
          </v-col>

          <v-col class="pl-0" v-if="selectedHospitals[currentObject].bettenStatusColor.statusECMO">
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusECMO == 'red'"
              color="red"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusECMO == 'green'"
              color="green"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusECMO == 'grey'"
              color="grey"
            >mdi-checkbox-blank-circle</v-icon>
            <v-icon
              class="icon-margin"
              v-if="selectedHospitals[currentObject].bettenStatusColor.statusECMO== 'yellow'"
              color="yellow"
            >mdi-checkbox-blank-circle</v-icon>Zusätzliche Beatmung
          </v-col>
          <v-col
            class="pl-0"
            v-if="selectedHospitals[currentObject].faelleCovidAktuell"
          >{{ selectedHospitals[currentObject].faelleCovidAktuell }} Corona Fälle</v-col>
        </v-container>

        <v-list-item-title
          v-if="selectedHospitals[currentObject].history.length != 0"
        >Zeitlicher Verlauf</v-list-item-title>
        <hr />
        <div class="small" v-if="selectedHospitals[currentObject].history.length != 0">
          <graph-view
            v-if="selectedHospitals[currentObject].history.length != 0"
            :chart-data="historyDataCollection"
            :height="200"
          />
        </div>
      </v-list-item-content>
    </v-list-item>
    <div
      v-if="(selectedHospitals.length > 1) && (selectedHospitals.length < 12)"
      class="text-center"
    >
      <a style="padding: 0.1rem;" v-for="(hospital, i) in selectedHospitals" :key="hospital.id">
        <v-icon class="dots" v-if="currentObject != i" color="grey">mdi-checkbox-blank-circle</v-icon>
        <v-icon class="dots" v-if="currentObject == i" color="black">mdi-checkbox-blank-circle</v-icon>
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
    currentObject: 0
  }),

  watch: {},
  computed: {
    selectedHospitals(): Array<{
      faelleCovidAktuell: number;
      meldezeitpunkt: string;
      history: { faelleCovidAktuell: number; meldezeitpunkt: string }[];
    }> {
      this.currentObject = 0;
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
      if (this.currentObject == this.selectedHospitals.length - 1) {
        this.currentObject = 0;
      } else {
        this.currentObject = this.currentObject + 1;
      }
    },
    sortedList(list, value) {
      return list.sort(function(a, b) {
        const keyA = Date.parse(a[value]);
        const keyB = Date.parse(b[value]);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    },
    generateDataRows() {
      const dataArray: number[] = [];
      const labelArray: string[] = [];

      try {
        const sortedList = this.sortedList(
          this.selectedHospitals[this.currentObject].history,
          "meldezeitpunkt"
        );

        sortedList.forEach(element => {
          dataArray.push(element.faelleCovidAktuell);
          labelArray.push(element.meldezeitpunkt.substring(0, 10));
        });

        dataArray.push(
          this.selectedHospitals[this.currentObject].faelleCovidAktuell
        );
        labelArray.push(
          this.selectedHospitals[this.currentObject].meldezeitpunkt.substring(
            0,
            10
          )
        );
      } catch (error) {
        console.log(error);
      }

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
  z-currentobject: 99;
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
