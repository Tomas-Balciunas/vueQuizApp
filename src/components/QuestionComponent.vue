<script setup lang="ts">
const props = defineProps({
  question: String,
});
</script>

<template>
  <div class="question">
    <span>
      {{ props.question }}
    </span>
  </div>
</template>

<style scoped>
.question {
  max-width: 70em;
  padding-top: calc(3vh);
  padding-bottom: calc(3vh);
  display: flex;
  align-items: center;
  justify-content: center;
}

span {
  text-align: center;
  margin: 2vw;
  font-size: calc(20px + 0.5vw);
  color: #ffbf00;
  font-weight: bold;
}
</style>
