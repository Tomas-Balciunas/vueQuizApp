import { watch } from "vue";
import { useQuizStore } from "../stores/quiz";

export function userChoice(choice: string) {
  const quiz = useQuizStore();
  quiz.answer = choice;
}

export function answerHandler() {
  const quiz = useQuizStore();

  return new Promise((resolve) => {
    const unwatch = watch(
      () => quiz.answer,
      () => {
        resolve(quiz.validatedAnswer);
        unwatch();
      }
    );
  });
}
