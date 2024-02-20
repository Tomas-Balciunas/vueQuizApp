<script setup lang="ts">
import { useScoreStore } from "../stores/score";
import { RouterLink } from "vue-router";

const score = useScoreStore();
</script>

<template>
  <h1>Quiz results</h1>
  <RouterLink to="/"><h3>HOME</h3></RouterLink>
  <div v-if="score.scores.length > 0" class="d-flex flex-column align-center" :style="'height: 70vh'">
    <div class="cont">
      <div class="wrapper" v-for="i in score.scores">

        <div class="w-100 resQ">
          <p>{{ i.question }}</p>
        </div>

        <div class="w-100 d-flex flex-column">
          <div class="w-100 d-flex justify-center">
            <div class="w-50">
              <p>Your answer</p>
            </div>
            <div class="w-50" v-if="!i.status">
              <p>Corrent answer</p>
            </div>
          </div>

          <div class="w-100 d-flex justify-center">
            <div
              :class="{ correct: i.status, incorrect: !i.status }"
              class="w-50 resC">

              <p>{{ i.answer }}</p>
            </div>
            <div class="w-50 resC" v-if="!i.status">
              <p>{{ i.correct }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div v-else>
    <p>No results available, complete the quiz to see results</p>
  </div>
</template>

<style scoped>
h1,
h3,
p {
  text-align: center;
}

h3 {
  text-decoration: underline;
  color: #ffbf00;
  font-weight: lighter;
  margin: 8px 0;
}

h1 {
  color: #ffbf00;
  font-size: 7vh;
}

p {
  color: white;
}

.cont {
  background-color: rgba(75, 75, 75, 0.521);
  border-radius: 6px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}

.cont::-webkit-scrollbar {
  width: 10px;
}

.cont::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: #e7e7e7;
  border: 1px solid #cacaca;
  margin: 2px 0;
}

.cont::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #ffbf00;
}

.wrapper {
  margin: 1vh 0;
  width: 95%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resQ {
  margin: 3vh 0;
  padding: 2vh 0.5vw;
  background-color: #0a0a0a;
  border: solid rgb(236, 236, 236) 3px;
}

.resC {
  background-color: #0a0a0a;
  border: solid rgb(236, 236, 236) 2px;
  margin: 0 5px;
  padding: 0.5vh 0;
}

.correct {
  background-color: #008040;
}
.incorrect {
  background-color: #bd271a;
}
</style>
