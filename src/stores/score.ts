import { defineStore } from "pinia";

export const useScoreStore = defineStore("score", {
  state: () => ({
    scores: [] as { status: boolean; question: string; answer: string; correct: string }[],
  }),
  actions: {
    updateScore(status: boolean, question: string, answer: string, correct:string) {
      this.scores.push({ status, question, answer, correct });
    },
  },
});
