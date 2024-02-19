<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import { sorted, Votes } from "../composables/helpers";
import { computed } from "vue";

const props = defineProps({
  votes: {
    type: Array as () => Votes[],
    default: () => {},
  },
  choices: {
    type: Array as () => string[],
    default: () => [],
  },
});

const votes = computed(() => {
  return sorted(props.choices, props.votes);
});

const series = [
  {
    data: votes.value,
  },
];
const chartOptions = {
  chart: {
    type: "bar",
    height: 380,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      barHeight: "100%",
      distributed: true,
      horizontal: true,
      dataLabels: {
        position: "bottom",
      },
    },
  },
  colors: ["#197070", "#191970", "#701919", "#451970"],
  dataLabels: {
    enabled: true,
    textAnchor: "start",
    style: {
      colors: ["#fff"],
    },
    formatter: function (val: any, opt: any) {
      return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
    },
    offsetX: 0,
  },
  xaxis: {
    categories: props.choices,
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  title: {
    text: "Voting Results",
    align: "center",
    floating: false,
    offsetY: 13,
    style: {
      fontSize:  '20px',
      fontWeight:  'bold',
    },
  },
  tooltip: {
    theme: "dark",
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return "";
        },
      },
    },
  },
  legend: {
      show: false,
  }
};
</script>

<template>
  <vue-apex-charts
    v-if="votes"
    type="bar"
    height="380"
    :options="chartOptions"
    :series="series"
  />
</template>

<style scoped></style>
