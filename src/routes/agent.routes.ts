import { Router } from "express";
import { agentController } from "../controllers/agent.controller";

const router = Router();

// POST /api/agent/chat - Enviar mensaje al agente
router.post("/chat", (req, res, next) => agentController.chat(req, res, next));

// GET /api/agent/session/:sessionId - Obtener historial de sesión
router.get("/session/:sessionId", (req, res, next) => agentController.getSession(req, res, next));

// GET /api/agent/sessions - Listar todas las sesiones (debug)
router.get("/sessions", (req, res, next) => agentController.getAllSessions(req, res, next));

// DELETE /api/agent/session/:sessionId
router.delete("/session/:sessionId", (req, res, next) => agentController.deleteSession(req, res, next));

export default router;