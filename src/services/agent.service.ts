import { ChatRequest, ChatResponse, SessionState } from "../types/agent.types";
import { randomUUID } from "node:crypto";
import { groq } from "../config/groq";

// Almacenamiento en memoria (después será base de datos)
const sessions: Map<string, SessionState> = new Map();

export class AgentService {
  
  // Obtener o crear sesión
  private getOrCreateSession(sessionId?: string): SessionState {
    const id = sessionId || randomUUID();
    
    if (!sessions.has(id)) {
      const newSession: SessionState = {
        sessionId: id,
        history: [],
        context: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      sessions.set(id, newSession);
    }
    
    return sessions.get(id)!;
  }

  // Eliminar sesión
    deleteSession(sessionId: string): boolean {
      return sessions.delete(sessionId);
    }

  // Procesar mensaje
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const startTime = Date.now();
    const session = this.getOrCreateSession(request.sessionId);
    
    // Guardar mensaje del usuario en historial
    session.history.push({
      role: "user",
      content: request.message,
      timestamp: new Date().toISOString(),
    });

    // AQUÍ LA LLAMADA A LA IA
    const reply = await this.generateResponse(request.message, session);
    
    // Guardar respuesta en historial
    session.history.push({
      role: "assistant",
      content: reply,
      timestamp: new Date().toISOString(),
    });

    // Actualizar sesión
    session.updatedAt = new Date().toISOString();
    sessions.set(session.sessionId, session);

    const processingTime = Date.now() - startTime;

    return {
      reply,
      sessionId: session.sessionId,
      timestamp: new Date().toISOString(),
      metadata: {
        model: "llama-3.1-8b-instant",
        processingTime,
      },
    };
  }

  // Generar respuesta usando OpenAI
  private async generateResponse(message: string, session: SessionState): Promise<string> {
    // Construir historial para OpenAI
  const messages = session.history.map(msg => ({
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }));

  // Agregar mensaje actual
  messages.push({ role: "user", content: message });

  // Llamar a OpenAI
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "Eres un asistente útil y amigable. Responde en español." },
      ...messages,
    ],
    max_tokens: 500,
  });

  return response.choices[0]?.message?.content || "No pude generar una respuesta.";
}

  // Obtener historial de sesión
  getSession(sessionId: string): SessionState | undefined {
    return sessions.get(sessionId);
  }

  // Listar todas las sesiones (útil para debug)
  getAllSessions(): SessionState[] {
    return Array.from(sessions.values());
  }
}

// Singleton
export const agentService = new AgentService();