import { ref } from "vue";
import { difficulties, amounts } from "../info/info";
import { useQuizStore } from "../stores/quiz";
import { useScoreStore } from "../stores/score";

export type Votes = {
  name: string;
  from: number;
  to: number;
  score: number;
};

export type Query = {
  difficulty: string;
  amount: string;
};

export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length; i > 1; i--) {
    const r: number = Math.floor(Math.random() * i);
    const c: number = i - 1;

    const crnt: T = arr[c];

    arr[c] = arr[r];
    arr[r] = crnt;
  }

  return arr;
}

export function mergeChoices(c: string, arr: string[]) {
  const list: string[] = arr.concat([c]);

  const sanitized = list.map((e: string) => {
    return convertHTMLEntities(e);
  });

  return shuffle(sanitized);
}

export function convertHTMLEntities(text: string) {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.documentElement.textContent as string;
}

export function getWeighted(choices: string[], correct: string) {
  const cumulative = ref(0);
  const w_correct = 5;
  const w_incorrect = 2;

  const votes = choices.map((choice: string) => {
    const weight = correct === choice ? w_correct : w_incorrect;

    const vote = {
      name: choice,
      from: cumulative.value,
      to: cumulative.value + weight,
      score: 0,
    };

    cumulative.value = cumulative.value + weight + 1;
    return vote;
  });

  for (let i = 0; i < 70; i++) {
    const r = Math.floor(Math.random() * cumulative.value);

    votes.forEach((q) => {
      if (q.from <= r && r <= q.to) q.score++;
    });
  }

  return votes;
}

export function sorted(choices: string[], votes: Votes[]) {
  const arr = ref([] as number[]);

  choices.forEach((c) => {
    const item = votes.find(({ name }) => name === c);
    if (item) arr.value.push(item.score);
  });

  return arr.value;
}

export function validateParams(query: Query) {
  const required = ["difficulty", "amount"];
  const amount = parseInt(query.amount);
  if (!required.every((e: string) => e in query)) return false;
  if (!difficulties.find((e) => e.value === query.difficulty)) return false;
  if (!(amounts.min <= amount && amount <= amounts.max)) return false;

  return true;
}

export function resetAll() {
  const score = useScoreStore();
  const quiz = useQuizStore();

  localStorage.removeItem("quiz");
  score.$reset();
  quiz.$reset();
}
