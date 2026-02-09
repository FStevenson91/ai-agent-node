import { Request, Response, NextFunction } from "express";
import { agentService } from "../services/agent.service";
import { ChatRequest } from "../types/agent.types";
import { z } from "zod";

const chatRequestSchema = z.object({
  message: z.string().min(1, "Message is required"),
  sessionId: z.string().optional(),
  context: z.record(z.unknown()).optional(),
});

export class AgentController {
  async chat(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validationResult = chatRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          error: "Validation failed",
          details: validationResult.error.format(),
        });
        return;
      }

      const chatRequest: ChatRequest = validationResult.data;
      const response = await agentService.chat(chatRequest);
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getSession(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { sessionId } = req.params;
      const session = agentService.getSession(sessionId);
      
      if (!session) {
        res.status(404).json({ error: "Session not found" });
        return;
      }
      
      res.json(session);
    } catch (error) {
      next(error);
    }
  }

  async getAllSessions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sessions = agentService.getAllSessions();
      res.json({ count: sessions.length, sessions });
    } catch (error) {
      next(error);
    }
  }

async deleteSession(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { sessionId } = req.params;
    const deleted = agentService.deleteSession(sessionId);
    
    if (!deleted) {
      res.status(404).json({ error: "Session not found", sessionId });
      return;
    }
    
    res.json({ message: "Session deleted", sessionId });
  } catch (error) {
    next(error);
  }
}
}

export const agentController = new AgentController();