export interface ChatRequest {
  message: string;
  sessionId?: string;
  context?: Record<string, unknown>;
}
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
export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (params: Record<string, unknown>) => Promise<unknown>;
}