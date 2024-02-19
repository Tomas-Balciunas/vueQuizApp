<script setup lang="ts">
import { useRouter } from "vue-router";
import { difficulties, amounts } from "../info/info.ts";
import { resetAll } from "../composables/helpers";
import { ref, computed } from "vue";

const router = useRouter();
const diffToggle = ref(0);
const amtToggle = ref(10);

const difficulty = computed(() => {
  return difficulties[diffToggle.value].value;
});

function handleSubmit() {
  resetAll();
  router.push({
    name: "quiz",
    query: { difficulty: difficulty.value, amount: amtToggle.value },
  });
}
</script>

<template>
  <div class="cont">
    <h1>Welcome to the Quiz!</h1>
    <div class="wrapper">
      <p class="mb-2">Select difficulty</p>
      <v-btn-toggle :color="'#ffbf00'" v-model="diffToggle" shaped mandatory
        ><v-btn v-for="diff in difficulties" class="btnToggle">
          {{ diff.name }}
        </v-btn>
      </v-btn-toggle>

      <p class="mt-3">Select question amount</p>
      <v-slider
        v-model="amtToggle"
        thumb-label="always"
        :color="'#ffbf00'"
        track-color="grey"
        min="5"
        max="50"
        :step="1"
        class="amtPicker"
        hide-details
        ><template v-slot:prepend>
          <p>{{ amounts.min }}</p>
        </template>
        <template v-slot:append>
          <p>{{ amounts.max }}</p>
        </template>
      </v-slider>
    </div>
    <v-btn class="btn" block @click="handleSubmit" type="submit"
      >START QUIZ</v-btn
    >
  </div>
</template>

<style scoped>
h1,
p {
  text-align: center;
}

p {
  color: white;
}

h1 {
  color: #ffbf00;
}

.cont {
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.wrapper {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  min-width: calc(150px + 15vw);
  max-height: calc(50px + 5vh);
  color: white;
  font-size: large;
  background-color: #0a0a0a;
  border: solid rgb(236, 236, 236) 3px;
  border-radius: 1em / 2em;
}

.amtPicker {
  width: 80%;
  margin: 30px 0;
}

.btnToggle {
  color: white;
  background-color: #0a0a0a;
  font-size: calc(10px + 0.5vh);
  max-height: calc(25px + 3vh);
  padding: 0 20px;
}

@media (hover: hover) {
  .btn:hover {
    cursor: pointer;
    border: solid #ffbf00 3px;
  }
}
</style>
