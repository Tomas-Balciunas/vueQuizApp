import { useScoreStore } from "../stores/score";

export async function handleAnswer(quiz: any) {
  const score = useScoreStore();
  const status = quiz.validatedAnswer
  score.updateScore(status, quiz.current.question, quiz.answer, quiz.current.correct_answer);

  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(false)
    }, 1000)
  );
}