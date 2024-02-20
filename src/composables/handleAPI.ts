import axios from "axios";
import OpenAI from "openai";
import { useRoute } from "vue-router";
import {
  GPT_CONTEXT,
  GPT_MODEL,
  GPT_PROMPT,
  QUIZ_BASE_URL,
} from "../info/info";

const openAiKey = import.meta.env.VITE_OPEN_AI_KEY;

export async function fetchOpenAi(question: string, choices: string, correct: string) {
  if (!openAiKey) {
    return `Error: API key not found as an environmental variable.\n\n Correct answer: ${correct}`
  } else {
    const openai = new OpenAI({
      apiKey: openAiKey,
      dangerouslyAllowBrowser: true,
    });

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
}

export async function fetchQuestions() {
  const route = useRoute();

  const response = await axios.get(
    `${QUIZ_BASE_URL}?amount=${route.query.amount}&difficulty=${route.query.difficulty}&type=multiple`
  );

  return response.data.results;
}
