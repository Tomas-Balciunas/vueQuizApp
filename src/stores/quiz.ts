import { defineStore } from "pinia";
import { mergeChoices, convertHTMLEntities } from "../composables/helpers";

type Current = {
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  choices: string[];
};

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    current: {
      correct_answer: "",
      incorrect_answers: [],
      question: "",
      choices: [],
    } as Current,
    answer: "",
  }),
  getters: {
    validatedAnswer(): boolean {
      return this.current.correct_answer === this.answer;
    },
  },
  actions: {
    updateCurrentQuestion(data: any) {
      const c = data[0];
      this.current = {
        correct_answer: c["correct_answer"],
        incorrect_answers: c["incorrect_answers"],
        question: convertHTMLEntities(c["question"]),
        choices: mergeChoices(c["correct_answer"], c["incorrect_answers"]),
      };
    },
  },
});
