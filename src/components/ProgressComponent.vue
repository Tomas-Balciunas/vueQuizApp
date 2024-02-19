<script setup lang="ts">
import { useScoreStore } from "../stores/score";
import { computed } from "vue";

const props = defineProps({
  total: { type: String, default: () => 0 },
});

const score = useScoreStore();

const progress = computed(() => {
  return (score.scores.length / parseInt(props.total)) * 100;
});
</script>

<template>
  <v-progress-linear
    :height="8"
    color="white"
    stream
    v-model="progress"
  ></v-progress-linear>
</template>

<style scoped></style>
