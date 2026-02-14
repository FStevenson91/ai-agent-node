import { agentService } from '../services/agent.service.js';

export const resolvers = {
  Query: {
    // Obtener todas las sesiones (usa el servicio existente)
    sessions: () => {
      const allSessions = agentService.getAllSessions();
      return allSessions.map(session => ({
        id: session.sessionId,
        messages: session.history,
        createdAt: session.createdAt,
      }));
    },

    // Obtener una sesión por ID
    session: (_: unknown, { id }: { id: string }) => {
      const session = agentService.getSession(id);
      if (!session) return null;
      
      return {
        id: session.sessionId,
        messages: session.history,
        createdAt: session.createdAt,
      };
    },
  },

  Mutation: {
    // Chatear con el agente
    chat: async (_: unknown, { sessionId, message }: { sessionId: string; message: string }) => {
      // Llamar al agente con el formato correcto
      const response = await agentService.chat({
        sessionId,
        message,
      });

      return {
        sessionId: response.sessionId,
        response: response.reply,
      };
    },
  },
};