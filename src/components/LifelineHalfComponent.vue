<script setup lang="ts">
import { shuffle } from "../composables/helpers";
import { ref } from "vue";

const props = defineProps({
  current: { type: Object, default: () => {} },
});

const disabled = ref(false);

const cutInHalf = () => {
  disabled.value = true;
  const half: number = Math.round(props.current.choices.length / 2);
  const shuffled: string[] = shuffle(props.current.incorrect_answers);

  for (let i = 0; i < half; i++) {
    const index = props.current.choices.findIndex((e: string) => e === shuffled[i]);
    props.current.choices.splice(index, 1);
  }
};
</script>

<template>
  <div class="lifeline">
    <v-tooltip text="Cut choices in half" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          :disabled="disabled"
          @click.once="cutInHalf"
          icon="mdi-fraction-one-half"
          aria-label="cut in half"
        ></v-btn
      ></template>
    </v-tooltip>
  </div>
</template>

<style scoped>
.lifeline {
  margin-top: calc(8px + 2vw);
  margin-left: 15px;
  margin-right: 15px;
}
</style>
