<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  total: { type: String, default: () => 0 },
  scores: { type: Object, default: () => [] }
});

const progress = computed(() => {
  return (props.scores.length / parseInt(props.total)) * 100;
});
</script>

<template>
  <v-progress-linear
    :height="8"
    color="#FF5349"
    stream
    v-model="progress"
  ></v-progress-linear>
</template>

<style scoped></style>
