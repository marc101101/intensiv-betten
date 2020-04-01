import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import GmapCluster from "vue2-google-maps/dist/components/cluster";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCHSgM2AXU8ue0kDi4Zu_vSjoh2wQFhti4"
  }
});

Vue.component("gmap-cluster", GmapCluster);
