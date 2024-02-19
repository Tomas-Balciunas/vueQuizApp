export const difficulties = [
    {name: 'Easy', value: 'easy'},
    {name: 'Medium', value: 'medium'},
    {name: 'Hard', value: 'hard'},
  ]

export const amounts = {min: 5, max: 50};

export const QUIZ_BASE_URL = "https://opentdb.com/api.php"
export const GPT_CONTEXT = "I am your friend and I'm participating in who wants to be a millionaire. I will call you using phone-a-friend lifeline. Give me a correct answer to the question as my friend. Show slight confusion if the question seems obscure based on available data, otherwise be confident."
export const GPT_PROMPT = "Hello friend, perhaps do you know an answer to this question? The options I have are:"
export const GPT_MODEL = "gpt-3.5-turbo"