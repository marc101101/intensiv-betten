<template>
  <v-app style="height:48px">
    <v-card class="toolbar">
      <v-toolbar dense>
        <img class="toolbar-logo" src="../../assets/logo.png" />
        <v-toolbar-title class="toolbar-title" to="/">
          <span class="toolbar-title-regular">Intensiv</span>
          <span class="toolbar-title-red">Betten</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn light icon v-on="on">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/">
              <v-list-item-title>Karteansicht</v-list-item-title>
            </v-list-item>
            <v-list-item to="/impressum">
              <v-list-item-title>Impressum</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Navbar"
});
</script>
<style scoped>
</style>
