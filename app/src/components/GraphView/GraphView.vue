<script lang="ts">
import Vue from "vue";
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default Vue.extend({
  name: "GraphView",
  extends: Line,
  mixins: [reactiveProp],
  props: { chartData: Object, options: Object },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).renderChart(this.chartData, this.options);
  }
});
</script>
<style scoped></style>
