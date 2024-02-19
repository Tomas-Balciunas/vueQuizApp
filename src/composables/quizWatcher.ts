import { watch } from "vue";
import { useQuizStore } from "../stores/quiz";

export const quizWatcher = (callback: () => void) => {
  const quiz = useQuizStore();
  return watch(
    () => quiz.current,
    () => {
      callback();
    }
  );
};
