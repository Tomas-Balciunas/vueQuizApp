<script setup lang="ts">
import { quizWatcher } from "../composables/quizWatcher";
import { fetchOpenAi } from "../composables/handleAPI";
import { ref } from "vue";

const props = defineProps({
  current: { type: Object, default: () => {} },
});

const disabled = ref(false);
const dialog = ref(false);
const response = ref();

const getResponse = async () => {
  const unwatch = quizWatcher(() => {
    disabled.value = true;
    unwatch();
  });

  response.value = await fetchOpenAi(
    props.current.question,
    props.current.choices,
    props.current.correct_answer
  );
};
</script>

<template>
  <div class="lifeline">
    <v-tooltip text="Phone your good friend ChatGPT" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          :disabled="disabled"
          @click.once="getResponse"
          @click="dialog = true"
          icon="mdi-phone-in-talk"
          aria-label="call a friend"
        ></v-btn>
      </template>
    </v-tooltip>
  </div>

  <v-dialog
    v-model="dialog"
    class="dialog"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <div v-if="response">
        <v-card-title class="text-center">Your friend says:</v-card-title>
        <v-card-text>{{ response }}</v-card-text>
      </div>

      <div v-else class="d-flex flex-column align-center mb-3">
        <v-col class="text-subtitle-1 text-center" cols="12">
          Waiting for an answer...
        </v-col>
        <v-progress-circular
          :size="50"
          color="red"
          indeterminate
        ></v-progress-circular>
      </div>

      <v-card-actions>
        <v-btn class="bg-red" color="primary" block @click="dialog = false"
          ><span class="text-black">Close</span></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.lifeline {
  margin-top: calc(8px + 2vw);
  margin-left: 15px;
}
.dialog {
  max-width: 600px;
}
</style>
