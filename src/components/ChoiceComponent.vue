<script setup lang="ts">
import { useQuizStore } from "../stores/quiz";
import { quizWatcher } from "../composables/quizWatcher";
import { ref } from "vue";

const props = defineProps({
  choice: String,
  inactive: Boolean,
});

const emit = defineEmits();
const quiz = useQuizStore();

const status = ref({
  success: false,
  failure: false,
});

const answerSelect = () => {
  quiz.userAnswer(props.choice as string);
  emit("selected");

  if (quiz.validatedAnswer) {
    status.value.success = true;
  } else {
    status.value.failure = true;
  }
};

quizWatcher(() => {
  status.value.success = false;
  status.value.failure = false;
});
</script>

<template>
    <button class="btn" :class="status" @click="answerSelect">
      <span>{{ props.choice }}</span>
    </button>
</template>

<style scoped>
span {
  width: 100%;
  text-align: center;
  margin: 1em;
  font-size: calc(12px + 0.5vw);
  color: white;
}

.btn {
  width: 95%;
  margin: 1vw 5px;
  max-width: 500px;
  background-color: #0a0a0a;
  border: solid rgb(236, 236, 236) 3px;
  border-radius: 1em / 2em;
}

button {
  width: 100%;
  padding: 1rem;
}

@media (hover: hover) {
  .btn:hover {
    cursor: pointer;
    border: solid #ffbf00 3px;
    transform: scale(1.02);
  }
}

@keyframes success {
  0% {
    background-color: #0a0a0a;
  }
  33% {
    background-color: #008040;
  }
  66% {
    background-color: #0a0a0a;
  }
  100% {
    background-color: #008040;
  }
}

.success {
  animation: success 0.5s linear forwards;
}

@keyframes failure {
  0% {
    background-color: #0a0a0a;
  }
  33% {
    background-color: #bd271a;
  }
  66% {
    background-color: #0a0a0a;
  }
  100% {
    background-color: #bd271a;
  }
}

.failure {
  animation: failure 0.5s linear forwards;
}
</style>
