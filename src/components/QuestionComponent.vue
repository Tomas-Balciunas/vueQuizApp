<script setup lang="ts">
const props = defineProps({
  question: String,
});
</script>

<template>
    <div class="question">
      <span>
        {{ props.question }}
      </span>
    </div>
</template>

<style scoped>
.question {
  margin: 5vh 0;
  padding-top: calc(10px + 5vh);
  padding-bottom: calc(10px + 5vh);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0a0a0a;
  border: solid rgb(236, 236, 236) 3px;
}

span {
  text-align: center;
  margin: 2vw;
  font-size: calc(20px + 0.5vw);
  color: white;
  font-weight: bold;
}
</style>
