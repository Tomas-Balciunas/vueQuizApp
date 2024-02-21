<script setup lang="ts">
import QuestionComponent from "../components/QuestionComponent.vue";
import ChoiceComponent from "../components/ChoiceComponent.vue";
import ProgressComponent from "../components/ProgressComponent.vue";
import LifelineCallComponent from "../components/LifelineCallComponent.vue";
import LifelineHalfComponent from "../components/LifelineHalfComponent.vue";
import LifelineAudienceComponent from "../components/LifelineAudienceComponent.vue";
import { fetchQuestions } from "../composables/handleAPI";
import { handleAnswer } from "../composables/handleAnswer";
import { useQuizStore } from "../stores/quiz";
import { useScoreStore } from "../stores/score";
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";

const data = ref([]);
const router = useRouter();
const route = useRoute();
const score = useScoreStore();
const quiz = useQuizStore();
const disabled = ref(false);

const initQuiz = async () => {
  disabled.value = true;
  disabled.value = (await handleAnswer(quiz)) as boolean;
  data.value.shift();
  !empty.value
    ? quiz.updateCurrentQuestion(data.value)
    : router.push({ name: "results" });
};

const empty = computed(() => {
  return data.value.length == 0;
});

onMounted(async () => {
  try {
    score.$reset();
    const savedQ = localStorage.getItem("quiz");
    if (!savedQ) {
      data.value = await fetchQuestions();
      localStorage.setItem("quiz", JSON.stringify(data.value));
    } else {
      data.value = JSON.parse(savedQ);
    }
    !empty.value && quiz.updateCurrentQuestion(data.value);
  } catch (error) {
    console.error("Mount error:", error);
  }
});
</script>

<template>
  <div v-if="!empty" class="cont">
    <div class="wrapper-q">
      <div class="quiz-q">
        <QuestionComponent :question="quiz.current.question" />
      </div>
    </div>

    <div class="wrapper">
      <div class="quiz-c">
        <v-col
          v-for="c in quiz.current.choices"
          sm="6"
          cols="12"
          class="quiz-c quiz-c-btn"
        >
          <ChoiceComponent
            :disabled="disabled"
            :choice="c"
            :quiz="quiz"
            @selected="initQuiz"
        /></v-col>
      </div>
    </div>

    <div class="wrapper">
      <div class="d-flex justify-center quiz-b">
        <LifelineAudienceComponent :current="quiz.current" />
        <LifelineHalfComponent :current="quiz.current" />
        <LifelineCallComponent :current="quiz.current" />
      </div>
      <div>
        <ProgressComponent
          :data="data"
          :scores="score.scores"
          :total="(route.query.amount as string)"
        />
      </div>
    </div>
  </div>

  <div v-else class="h-100">
    <h1>Waiting for data...</h1>
    <div class="d-flex flex-column align-center">
      <v-progress-circular
        :size="100"
        color="red"
        indeterminate
      ></v-progress-circular>
      <div class="d-flex justify-center">
        <RouterLink to="/"><h3 aria-label="home">HOME</h3></RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  color: white;
  padding: 10vh;
}
h3 {
  text-decoration: underline;
  color: #ffbf00;
  font-weight: lighter;
  margin-top: 50px;
}
.cont {
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
}

.quiz-q {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #0a0a0a;
  border-bottom: solid #ffbf00 3px;
  border-radius: 0 0 10% 10%;
}

.quiz-c {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.quiz-c-btn {
  margin: 0;
  padding: 0;
}

.quiz-b {
  margin: 5vh 0;
  border-top: solid 3px #ffbf00;
  border-radius: 45%;
}

.wrapper {
  max-width: 70em;
  width: 100%;
}

.wrapper-q {
  width: 100%;
  margin-bottom: 2vh;
}
</style>
