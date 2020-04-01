<template>
  <v-autocomplete
    v-model="select"
    :loading="loading"
    :items="hospitals"
    :search-input.sync="search"
    @change="e => $store.commit('selectHospital', e)"
    item-text="hospital_short"
    cache-items
    class="mx-4"
    flat
    hide-no-data
    label="Deine Stadt"
    prepend-icon="mdi-magnify"
    solo
    return-object
    style="height: 3rem;"
  ></v-autocomplete>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SearchBar",

  data() {
    return {
      loading: false,
      items: ["a", "b"],
      search: null,
      select: null,
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ]
    };
  },
  watch: {
    search(val: string) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(v: string) {
      this.loading = true;
      this.items = this.states.filter((e: string) => {
        return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
      });
      this.loading = false;
    }
  },
  computed: {
    hospitals() {
      return this.$store.state.hospitals;
    }
  }
});
</script>
