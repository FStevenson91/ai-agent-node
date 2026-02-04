// las interfaces definen los tipos de datos usados en el agente AI, y sirven para definir y validar las estructuras de datos.

// Request para chatear con el agente
export interface ChatRequest {
  message: string;
  sessionId?: string;
  context?: Record<string, unknown>;
}

// Respuesta del agente
export interface ChatResponse {
  reply: string;
  sessionId: string;
  timestamp: string;
  metadata?: {
    model: string;
    tokensUsed?: number;
    processingTime: number;
  };
}

// Estado de una sesión (memoria del agente)
export interface SessionState {
  sessionId: string;
  history: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp: string;
  }>;
  context: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// Configuración de un Tool (herramienta del agente)
export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (params: Record<string, unknown>) => Promise<unknown>;
}