import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function callLLM(query: String) {
  const chatCompletion = await getGroqChatCompletion(query);
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
  return chatCompletion.choices[0]?.message?.content || "";
}

export async function getGroqChatCompletion(query: String) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are a SQL query expert. Don't give any other text but just a single working SQL query at a time after thinking through the question asked in triple curly braces. 
        Syntax use should be always right and easy to understand. You will respond to greetings and stating your purpose.
        The question {{{${query}}}} `,
      },
    ],
    model: "llama3-8b-8192",
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
