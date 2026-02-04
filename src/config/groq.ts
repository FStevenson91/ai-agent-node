import OpenAI from "openai";
import { env } from "./env";

// Groq usa el mismo SDK de OpenAI (compatible)
export const openai = new OpenAI({
  apiKey: env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const groq = openai;