import { defineStore } from "pinia";

type Scores = {
  status: boolean;
  question: string;
  answer: string;
  correct: string;
};

export const useScoreStore = defineStore("score", {
  state: () => ({
    scores: [] as Scores[],
  }),
  actions: {
    updateScore(
      status: boolean,
      question: string,
      answer: string,
      correct: string
    ) {
      this.scores.push({ status, question, answer, correct });
    },
  },
});
