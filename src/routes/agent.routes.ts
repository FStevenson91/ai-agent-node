import { Router } from "express";
import { agentController } from "../controllers/agent.controller";

const router = Router();

router.post("/chat", (req, res, next) => agentController.chat(req, res, next));

router.get("/session/:sessionId", (req, res, next) => agentController.getSession(req, res, next));

router.get("/sessions", (req, res, next) => agentController.getAllSessions(req, res, next));

router.delete("/session/:sessionId", (req, res, next) => agentController.deleteSession(req, res, next));

export default router;