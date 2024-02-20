<script setup lang="ts">
const props = defineProps({
  question: String,
});
</script>

<template>
  <div class="question" aria-labelledby="question">
    <span id="question">
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
  user-select: none;
}

@media (max-height: 415px) {
  .question, span {
    padding: 0;
  }
  span {
    font-size: 20px;
  }
}
</style>
