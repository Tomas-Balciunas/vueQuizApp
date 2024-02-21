import axios from "axios";
import OpenAI from "openai";
import { useRoute } from "vue-router";
import { useNotifStore } from "../stores/notif";
import {
  GPT_CONTEXT,
  GPT_MODEL,
  GPT_PROMPT,
  QUIZ_BASE_URL,
  OPEN_AI_ERR_MSG,
} from "../info/info";

const notif = useNotifStore();
const openAiKey = import.meta.env.VITE_OPEN_AI_KEY;

export async function fetchOpenAi(
  question: string,
  choices: string,
  correct: string
) {
  if (!openAiKey) {
    return `${OPEN_AI_ERR_MSG} ${correct}`;
  } else {
    try {
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
    } catch (error) {
      notif.showNotif(error as string);
      return `${OPEN_AI_ERR_MSG} ${correct}`;
    }
  }
}

export async function fetchQuestions() {
  try {
    const route = useRoute();

    const response = await axios.get(
      `${QUIZ_BASE_URL}?amount=${route.query.amount}&difficulty=${route.query.difficulty}&type=multiple`
    );

    if (response.data.results.length > 0) {
      return response.data.results;
    } else {
      const msg = `Could not load data from API, response code: ${response.data.response_code}`;
      notif.showNotif(msg);
    }

    return [];
  } catch (error) {
    notif.showNotif(error as string);

    return []
  }
}
