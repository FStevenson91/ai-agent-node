# AI Agent Node

API REST de agente de IA construida con Node.js, TypeScript y Express.

## Tech Stack

- Node.js + TypeScript
- Express
- Groq API (Llama 3.1)
- Zod (validación)

## Setup

1. Clonar el repositorio
2. Instalar dependencias:
```bash
   npm install
```
3. Copiar variables de entorno:
```bash
   cp .env.example .env
```
4. Agregar tu API key de Groq en `.env`

5. Ejecutar en desarrollo:
```bash
   npm run dev
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /health | Health check |
| POST | /api/agent/chat | Chat con el agente |
| GET | /api/agent/sessions | Listar sesiones |
| GET | /api/agent/session/:id | Obtener sesión |
| DELETE | /api/agent/session/:id | Eliminar sesión |

## Deploy

Deployado en Azure App Service:
- URL: http://ai-agent-felipe.azurewebsites.net