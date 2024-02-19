<script setup lang="ts">
import QuestionComponent from "../components/QuestionComponent.vue";
import ChoiceComponent from "../components/ChoiceComponent.vue";
import ProgressComponent from "../components/ProgressComponent.vue";
import LifelineCallComponent from "../components/LifelineCallComponent.vue";
import LifelineHalfComponent from "../components/LifelineHalfComponent.vue";
import LifelineAudienceComponent from "../components/LifelineAudienceComponent.vue";
import { fetchQuestions } from "../composables/handleAPI";
import { main } from "../composables/mainLoop";
import { useQuizStore } from "../stores/quiz";
import { useScoreStore } from "../stores/score";
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";

const data = ref([]);
const router = useRouter()
const route = useRoute()
const score = useScoreStore();
const quiz = useQuizStore();
const disabled = ref(false);

const initQuiz = async () => {
  console.log(score.scores)
    disabled.value = true;
    disabled.value = (await main(quiz)) as boolean;
    data.value.shift();
    !empty.value ? quiz.updateCurrentQuestion(data.value) : router.push({name: "results"})
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
    console.error("onMounted error:", error);
  }
});
</script>

<template>
  <div v-if="!empty" class="cont">
    <div class="wrapper">
      <div>
        <QuestionComponent :question="quiz.current.question" />
      </div>
    </div>
    <div class="wrapper">
      <div class="quiz_c">
        <v-col
          v-for="c in quiz.current.choices"
          md="6"
          cols="12"
          class="quiz_c quiz-c-btn"
        >
          <ChoiceComponent
            :disabled="disabled"
            :choice="c"
            :inactive="disabled"
            @selected="initQuiz"
        /></v-col>
      </div>
    </div>

    <div class="wrapper">
      <div class="d-flex justify-center quiz_b">
        <LifelineAudienceComponent :current="quiz.current" />
        <LifelineHalfComponent :current="quiz.current" />
        <LifelineCallComponent :current="quiz.current" />
      </div>
      <div>
        <ProgressComponent :data="data" :total="(route.query.amount as string)" />
      </div>
    </div>
  </div>

  <div v-else>
    <h1>No data found</h1>
    <RouterLink to="/results"></RouterLink>
  </div>
</template>

<style scoped>
.cont {
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
}

.quiz_c {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.quiz-c-btn {
  margin: 0;
  padding: 0;
}

.quiz_b {
  margin: 5vh 0;
  border-top: solid 3px white;
  border-radius: 45%;
}

.wrapper {
  max-width: 70em;
  width: 100%;
}
</style>
