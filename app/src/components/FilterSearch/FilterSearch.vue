<template>
  <v-card style="margin-top:0.5rem">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Filter Optionen</div>
        <v-select v-model="value" :items="items" attach chips label="Bundesländer" multiple></v-select>
        <v-text-field
          v-model="dateRangeText"
          label="Daten Von Bis"
          prepend-icon="mdi-calendar"
          readonly
          @click="showCalendar = !showCalendar"
        ></v-text-field>
        <v-col v-if="showCalendar">
          <v-date-picker v-model="dates" range></v-date-picker>
        </v-col>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Filter",
  data: () => ({
    dates: ["2020-03-10", "2020-04-08"],
    showCalendar: false,
    items: [
      "Baden-Württemberg",
      "Bayern",
      "Berlin",
      "Brandenburg",
      "Hansestadt Bremen",
      "Hamburg",
      "Hessen",
      "Mecklenburg-Vorpommern",
      "Niedersachsen",
      "Nordrhein-Westfalen",
      "Rheinland-Pfalz",
      "Saarland",
      "Sachsen",
      "Sachsen-Anhalt",
      "Schleswig-Holstein",
      "Thüringen"
    ],
    value: [
      "Baden-Württemberg",
      "Bayern",
      "Berlin",
      "Brandenburg",
      "Hansestadt Bremen",
      "Hamburg",
      "Hessen",
      "Mecklenburg-Vorpommern",
      "Niedersachsen",
      "Nordrhein-Westfalen",
      "Rheinland-Pfalz",
      "Saarland",
      "Sachsen",
      "Sachsen-Anhalt",
      "Schleswig-Holstein",
      "Thüringen"
    ]
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  }
});
</script>
<style scoped>
.v-list-item__content {
  overflow: visible;
}
</style>
