// src/config/env.ts
import dotenv from "dotenv";
import { z } from "zod";

// Cargar variables de entorno
dotenv.config();

// Schema de validación con Zod (esto es PRO - valida tus env vars)
const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
});

// Validar y exportar
const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error("❌ Invalid environment variables:", envParsed.error.format());
  process.exit(1);
}

export const env = envParsed.data;