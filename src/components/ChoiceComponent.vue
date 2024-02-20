<script setup lang="ts">
import { quizWatcher } from "../composables/quizWatcher";
import { ref } from "vue";

const props = defineProps({
  quiz: { type: Object, default: () => {} },
  choice: String,
});

const emit = defineEmits();

const status = ref({
  success: false,
  failure: false,
});

const answerSelect = () => {
  props.quiz.answer = props.choice;
  emit("selected");
  props.quiz.validatedAnswer
    ? (status.value.success = true)
    : (status.value.failure = true);
};

quizWatcher(() => {
  status.value.success = false;
  status.value.failure = false;
});
</script>

<template>
  <button class="btn" :class="status" @click="answerSelect">
    <span aria-label="option">{{ props.choice }}</span>
  </button>
</template>

<style scoped>
span {
  width: 100%;
  text-align: center;
  margin: 1em;
  font-size: calc(12px + 0.5vw);
  color: white;
  user-select: none;
}

.btn {
  width: 95%;
  margin: 1vw 5px;
  padding: 1rem;
  max-width: 500px;
  background-color: #0a0a0a;
  border: solid rgb(236, 236, 236) 3px;
  border-radius: 1em / 2em;
}

@media (hover: hover) {
  .btn:hover {
    cursor: pointer;
    border: solid #ffbf00 3px;
    transform: scale(1.02);
  }
}

.success {
  animation: success 0.5s linear forwards;
}

.failure {
  animation: failure 0.5s linear forwards;
}

@media (max-height: 415px) {
  .btn {
    margin: 3px 0;
    padding: 10px 5px;
  }
}
</style>
