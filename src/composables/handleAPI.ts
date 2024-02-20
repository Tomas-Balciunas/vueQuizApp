import axios from "axios";
import OpenAI from "openai";
import { useRoute } from "vue-router";
import {
  GPT_CONTEXT,
  GPT_MODEL,
  GPT_PROMPT,
  QUIZ_BASE_URL,
} from "../info/info";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

export async function fetchOpenAi(question: string, choices: string) {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: GPT_CONTEXT,
      },
      {
        role: "user",
        content: `${GPT_PROMPT} ${question} ${choices}`,
      },
    ],
    model: GPT_MODEL,
  });

  return response.choices[0].message.content;
}

export async function fetchQuestions() {
  const route = useRoute();

  const response = await axios.get(
    `${QUIZ_BASE_URL}?amount=${route.query.amount}&difficulty=${route.query.difficulty}&type=multiple`
  );

  return response.data.results;
}
