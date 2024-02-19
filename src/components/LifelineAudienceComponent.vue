<script setup lang="ts">
import ChartComponent from "../components/ChartComponent.vue";
import { getWeighted } from "../composables/helpers";
import { quizWatcher } from "../composables/quizWatcher";
import { ref } from "vue";

const props = defineProps({
  current: { type: Object, default: () => {} },
});

const disabled = ref(false);
const dialog = ref(false);
const votes = ref();

const getVotes = () => {
  const unwatch = quizWatcher(() => {
    disabled.value = true;
    unwatch();
  });

  setTimeout(() => {
    votes.value = getWeighted(
      props.current.choices,
      props.current.correct_answer
    );
  }, 30);
};
</script>

<template>
  <div class="lifeline">
    <v-tooltip text="Ask the audience" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          :disabled="disabled"
          @click.once="getVotes"
          @click="dialog = true"
          icon="mdi-chart-bar"
        ></v-btn
      ></template>
    </v-tooltip>
  </div>

  <v-dialog
    v-model="dialog"
    class="dialog"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <ChartComponent
        v-if="votes"
        :votes="votes"
        :choices="props.current.choices"
      />
      <div class="d-flex flex-column align-center mb-3" v-else>
        <v-col class="text-subtitle-1 text-center">
          Voting in progress...
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
  margin-right: 15px;
}
.dialog {
  max-width: 600px;
}
</style>
